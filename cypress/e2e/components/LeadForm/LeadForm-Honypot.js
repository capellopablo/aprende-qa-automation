import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor"
import {leadForm} from "../../../classes/components/LeadForm";
import {
    addTimestampToEmail,
    camelCaseToSnakeCase,
    getCurrentTimestamp,
    snakeCaseToCamelCase
} from "../../../support/helper";
import {cookieDisclaimer} from "../../../classes/components/CookieDisclaimer";

before( () => {
    cy.visit(`/escuela-belleza/beauty-expert/?${getCurrentTimestamp()}`)
    cookieDisclaimer.close()
    leadForm.setParent("section.block.b-hero-v2")
    leadForm.generateLeadData({firstName: "Bot", email: addTimestampToEmail( "bot_automation@aprende.dev" )})
    cy.wait(2000)

})

When(/^el bot completa el campo oculto (.*)$/, function (field) {
    const value = field === "user_email" ? leadForm.getLeadData("email") : leadForm.getLeadData( snakeCaseToCamelCase( field ) )
    cy.log(field,value)
    // cy.get(leadForm.getHoneypotField(field)).should("exist").should("not.be.visible")
    // leadForm.fillHoneypotField(field, value)
});
Then(/^el valor existe en el campo oculto (.*)$/, function (field) {
    const value = field === "user_email" ? leadForm.getLeadData("email") : leadForm.getLeadData( snakeCaseToCamelCase( field ) )
    cy.log(field,value)
    // cy.get( leadForm.getHoneypotField(field) ).should('have.value', value);
});



Then(/^el usuario es redirigido a una página de gracias sin escapes$/, function () {
    cy.wait(2000)
    cy.location("pathname").should("equal", "/gracias/")
});


When(/^el bot completa los siguientes campos en el Lead Form$/, function (dataTable) {
    dataTable.hashes().forEach(row => {
        cy.log(`Agregando el producto ${row.producto} al carrito`);
        cy.log(`Agregando el producto ${row.precio} al carrito`);

        const value = field === "user_email" ? leadForm.getLeadData("email") : leadForm.getLeadData( snakeCaseToCamelCase( field ) )
        cy.log(field,value)
        // cy.get(leadForm.getHoneypotField(field)).should("exist").should("not.be.visible")
        // leadForm.fillHoneypotField(field, value)

    });
});
