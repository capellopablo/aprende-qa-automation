import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor"
import {benefitsBlock} from "../../../classes/blocks/BenefitsBlock";
import {getCurrentTimestamp} from "../../../support/helper";


Given(/^El usuario ve el bloque benefits$/, function () {
    cy.visit(`/?${getCurrentTimestamp()}`)
    // benefitsBlock.exists()

    // cy.get("bodyyyy")
});
