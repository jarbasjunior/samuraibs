import moment from 'moment';
import businessDays from 'moment-business-days';

// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'underscore';
import { apiBaseUrl } from '../../cypress.json';

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('postAuth', (user) => {
  const payload = { email: user.email, password: user.password };
  cy.request({ method: 'POST', url: `${apiBaseUrl}/sessions`, body: payload })
    .then((result) => {
      expect(result.status).to.eq(200);
      Cypress.env('authUser', result.body.token);
    });
});

Cypress.Commands.add('postUser', (user) => {
  cy.task('removeUser', user.email);
  cy.request({ method: 'POST', url: `${apiBaseUrl}/users`, body: user })
    .then((result) => expect(result.status).to.eq(200));
});

Cypress.Commands.add('getProviderByEmail', (token, email) => {
  cy.request({
    method: 'GET',
    url: `${apiBaseUrl}/providers`,
    headers: { authorization: `Bearer ${token}` },
  }).then((result) => {
    expect(result.status).to.eq(200);
    result.body.forEach((provider) => {
      if (provider.email === email) {
        Cypress.env('providerId', provider.id);
      }
    });
  });
});

Cypress.Commands.add('postAppointment', (token, providerId) => {
  businessDays.updateLocale('us', {
    workingWeekdays: [1, 2, 3, 4, 5],
  });

  const hour = _.sample(['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']);
  const date = new Date();
  // eslint-disable-next-line no-underscore-dangle
  const nextWorkinDay = new Date(Date.parse(moment(businessDays(date, 'YYYY-MM-DD').nextBusinessDay()._d).format('YYYY/MM/DD'))).getDate();
  const time = moment(date.setDate(nextWorkinDay)).format(`YYYY-MM-DD ${hour}:00`);
  const payload = { provider_id: providerId, date: time };

  Cypress.env('appointment', { day: nextWorkinDay, hour });

  cy.task('removeAllAppointments').then(() => {
    cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/appointments`,
      headers: { authorization: `Bearer ${token}` },
      body: payload,
    }).then((result) => expect(result.status).to.eq(200));
  });
});

Cypress.Commands.add('postRecoveryPass', (email) => {
  cy.request({ method: 'POST', url: `${apiBaseUrl}/password/forgot`, body: { email } })
    .then((result) => expect(result.status).to.eq(204));

  cy.task('tokenRecoveryPass', email).then((res) => {
    Cypress.env('recoveryToken', res.token);
  });
});

Cypress.Commands.add('setUserDataLocalStorage', (usr) => {
  cy.postAuth(usr).then((res) => {
    const { user, token } = res.body;
    window.localStorage.setItem('@Samurai:user', JSON.stringify(user));
    window.localStorage.setItem('@Samurai:token', token);
  });
});
