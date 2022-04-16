import { el } from './elements';

class DashPage {
  static go() {
    cy.visit('/dashboard');
  }

  static calendarShouldBeVisible() {
    cy.get(el.calendar).should('be.visible');
  }

  static selectDay(day) {
    const choseDay = new RegExp(`^${day}$`, 'g');
    cy.contains(el.availableDays, choseDay).click();
  }

  static mustDisplayCustomerAppointmentTo(customer, hour) {
    cy.get(el.customerAppointment, { timeout: 10000 }).children('span').should('have.text', hour)
      .siblings('div')
      .find('strong', customer)
      .should('be.visible');
  }
}

export default DashPage;
