require('dotenv/config');

const { Pool } = require('pg');

/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_NAME,
    port: 5432,
  });

  on('task', {
    removeUser(email) {
      return new Promise((resolve) => {
        pool.query('delete from public.users where email = $1', [email], (error, result) => {
          if (error) throw error;
          resolve({ success: result });
        });
      });
    },
  });

  on('task', {
    tokenRecoveryPass(email) {
      const query = 'select us.token from public.user_tokens us join public.users u '
        + 'on u.id = us.user_id where u.email = $1 order by us.created_at desc;';
      return new Promise((resolve) => {
        pool.query(query, [email], (error, result) => {
          if (error) throw error;
          resolve({ token: result.rows[0].token });
        });
      });
    },
  });

  on('task', {
    removeAllAppointments() {
      return new Promise((resolve) => {
        pool.query('delete from public.appointments;', (error, result) => {
          if (error) throw error;
          resolve({ success: result });
        });
      });
    },
  });

  on('task', {
    monthInPtBr(month) {
      const months = {
        0: 'Janeiro',
        1: 'Fevereiro',
        2: 'Março',
        3: 'Abril',
        4: 'Maio',
        5: 'Junho',
        6: 'Julho',
        7: 'Agosto',
        8: 'Setembro',
        9: 'Outubro',
        10: 'Novembro',
        11: 'Dezembro',
      };
      const chosenMonth = months[month];
      return chosenMonth;
    },
  });

  on('task', {
    isLastDayOfMonth() {
      const today = new Date();
      const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return (today.getDate() === lastDayOfMonth.getDate());
    },
  });
};
