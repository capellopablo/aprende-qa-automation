// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
// import cypress allure adapter first to have all custom
// commands being collapsed in report as parent command
import '@mmisty/cypress-allure-adapter/support';

// Import commands.js using ES2015 syntax:
import './commands';

// example adding host and thread to see in timeline
Cypress.Allure?.on('test:started', () => {
  Cypress.Allure.host('my-host');
  Cypress.Allure.thread(Cypress.env('thread') ?? '01');
})

const { addCompareSnapshotCommand } = require('cypress-visual-regression/dist/command')
addCompareSnapshotCommand()
