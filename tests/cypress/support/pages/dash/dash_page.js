import { el } from './elements';

class DashPage {
  static go() {
    cy.visit('/dashboard');
  }

  static calendarShouldBeVisible() {
    cy.get(el.calendar).should('be.visible');
  }

  static selectDay(appointment) {
    const choseDay = new RegExp(`^${appointment.getDate()}$`, 'g');
    this.isLastDayOfMonth(appointment);
    cy.contains(el.availableDays, choseDay).click();
  }

  static mustDisplayCustomerAppointmentTo(customer, hour) {
    cy.get(el.customerAppointment).children('span').should('have.text', hour)
      .siblings('div')
      .find('strong', customer)
      .should('be.visible');
  }

  static isLastDayOfMonth(appointment) {
    cy.task('isLastDayOfMonth').then((result) => {
      if (result) {
        cy.get(el.nextMonthIcon).click();
        cy.task('monthInPtBr', appointment.getMonth()).then((month) => {
          cy.contains(el.monthYearNameLabel, month).should('be.visible');
        });
      }
    });
  }
}

export default DashPage;
