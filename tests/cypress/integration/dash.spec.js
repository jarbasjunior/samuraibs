import LoginPage from '../support/pages/login/login_page';
import DashPage from '../support/pages/dash/dash_page';

describe('dashboard', () => {
  let provider;
  let customer;

  before(() => {
    cy.fixture('providers').then((providers) => {
      provider = providers.ramonValdes;
      return provider;
    });
    cy.fixture('users').then((users) => {
      customer = users.zeRamalho;
      return customer;
    });
  });

  context('Quando um agendamento é realizado', () => {
    before(() => {
      cy.postUser(provider);
      cy.postUser(customer);
      cy.postAuth(customer).then(() => {
        cy.getProviderByEmail(Cypress.env('authUser'), provider.email).then(() => {
          cy.postAppointment(Cypress.env('authUser'), Cypress.env('providerId'));
        });
      });
    });

    it('Deve ser exibido no dash do cabeleireiro', () => {
      const appointment = Cypress.env('appointment');
      LoginPage.go();
      LoginPage.fillForm(provider);
      LoginPage.submitForm();
      DashPage.calendarShouldBeVisible();
      DashPage.selectDay(appointment.day);
      DashPage.mustDisplayCustomerAppointmentTo(customer.name, appointment.hour);
    });
  });
});
