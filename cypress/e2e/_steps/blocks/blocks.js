import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor"
import {benefitsBlock} from "../../../classes/blocks/BenefitsBlock";


Given(/^El usuario ingresa a la (.*) y ve el bloque (.*)$/, function () {
    cy.visit(`https://qa.aprende.dev/`)
    benefitsBlock.exists()
});
