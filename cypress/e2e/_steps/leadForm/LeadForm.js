import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor"
import {leadForm} from "../../../classes/components/LeadForm";
import {cookieDisclaimer} from "../../../classes/components/CookieDisclaimer";
import {addTimestampToEmail, getCurrentTimestamp} from "../../../support/helper";




Given(/^El usuario ingresa a la homepage desde (.*) y ve el formulario de contacto$/, (country = "US") => {
    // cy.get("section.block.b-hero-v2 div.r-form_multistep.r-form__vertical").as("LeadForm").should("exist")

    cy.visit(`/?${getCurrentTimestamp()}&qa_country=${country}&${leadForm.generateLeadUTMs("string")}`)
    cookieDisclaimer.close()
    cy.setCookie("fbc", "fb.1.1700459896974.IwAR31PYrWPkA868SyZ6fWPyePhVZb-v5OeSQF0wBhC9AyLklxIzazkkopYMg_aem_AbHV0M8DUkETYYSX0QUCz64JoVJpOWwIV4LbIdI5p20jWe6dR-lR_Ir6zgjGDccjNhdAoafC-4W9Uc3gWAkZRysn")
    cy.wait(2000)
    cy.get(leadForm.getSelector()).as("LeadForm").should("exist")
    leadForm.setParent("section.block.b-hero-v2")
})

Given(/^el usuario de (.*) conoce sus datos para completar el Lead Form$/, function (country = "US") {
    leadForm.generateLeadData()
});



When(/^el usuario completa su nombre$/, function () {
    // cy.get('section.block.b-hero-v2 div.r-form_multistep.r-form__vertical input#firstName').type(name)
    // leadForm.fillField("firstName", name)

    cy.get(leadForm.getField("firstName")).should("exist").should("be.visible")
    leadForm.fillFirstName(leadForm.getLeadData("firstName"))
});
Then(/^el usuario ve su nombre en el campo firstName$/, function () {
    // cy.get('section.block.b-hero-v2 div.r-form_multistep.r-form__vertical input#firstName').should('have.value', name);

    cy.get( leadForm.getField("firstName") ).should('have.value', leadForm.getLeadData("firstName") );
});



When(/^el usuario completa su apellido$/, function () {
    cy.get(leadForm.getField("lastName")).should("exist").should("be.visible")
    leadForm.fillLastName(leadForm.getLeadData("lastName"))
});
Then(/^el usuario ve su apellido en el campo lastName$/, function () {
    cy.get( leadForm.getField("lastName") ).should('have.value', leadForm.getLeadData("lastName"));
});



When(/^el usuario completa su email$/, function () {
    cy.get(leadForm.getField("email")).should("exist").should("be.visible")
    leadForm.fillEmail(leadForm.getLeadData("email"))
});
Then(/^el usuario ve su email aparece en el campo email$/, function () {
    cy.get( leadForm.getField("email") ).should('have.value', leadForm.getLeadData("email"));
});



When(/^el usuario completa su telefono$/, function () {
    cy.get(leadForm.getField("phone")).should("exist").should("be.visible")
    leadForm.fillPhone(leadForm.getLeadData("phone"))
});
Then(/^el usuario ve su telefono en el campo phoneRow$/, function () {
    // cy.get( leadForm.getField("phone") ).should('have.value', leadForm.getLeadData("phone"));
});



When(/^el usuario selecciona un Area de interes$/, function () {
    cy.get(leadForm.getField("areaOfInterestSelect")).should("be.visible")
    leadForm.pickAreaOfInterest("Bartender")
});
When(/^el usuario ve el area de interes en el campo area_of_interest/, function () {
    cy.get(leadForm.getField("areaOfInterestInput")).should("have.value", "Bartender")
});



When(/^el usuario acepta recibir mensajes via WhatsApp$/, function () {
    cy.get(leadForm.getField("optIn")).should("not.be.visible")
    leadForm.checkWhatsAppOptIn()
});
When(/^el usuario ve aceptado el campo WhatsAppOptIn/, function () {
    cy.get(leadForm.getField("optIn")).should("be.checked")
});




When(/^el usuario hace click el botón de envío del formulario$/, function () {
    leadForm.submit()
});
Then(/^el usuario es redirigido a una página de gracias$/, function () {
    cy.wait(2000)
    cy.location("pathname").should("equal", "/gracias/")
});
Then(/^el lead existe en la base de datos$/, function () {
    leadForm.getLead(leadForm.getLeadData("email"));

    cy.get('@leadData').then((leadData) => {
        expect(leadData).to.have.property('email', leadForm.getLeadData("email"));
    });
});
When(/^el lead es procesado automáticamente$/, function () {
    cy.log(leadForm.getLeadData())
    cy.log(leadForm.getLeadData("email"))

    leadForm.processLead(leadForm.getLeadData("email"));
});
Then(/^el lead es creado exitosamente en Salesforce$/, function () {

    cy.get('@leadData').then((leadData) => {
        expect(leadData).to.have.property('email', leadForm.getLeadData("email"));
        expect(leadData.responses.salesforce.status).to.eq("success")
        expect(leadData.responses.salesforce.response_body).to.have.property("id")
        expect(leadData.responses.salesforce.success).to.eq(true)
    });

});
