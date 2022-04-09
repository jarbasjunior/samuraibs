import LoginPage from '../support/pages/login/login_page';
import DashPage from '../support/pages/dash/dash_page';
import { zeRamalho } from '../support/factories/appointments/customers';
import { ramonValdes } from '../support/factories/appointments/providers';

describe('dashboard', () => {
  const customer = zeRamalho;
  const provider = ramonValdes;

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
