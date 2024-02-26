import {Given, Then, When} from "@badeball/cypress-cucumber-preprocessor";

Given(/^el usuario ha ingresado a la tienda online$/, function () {

});

When('el usuario agrega productos al carrito', (dataTable) => {
    dataTable.hashes().forEach(row => {
        cy.log(`Agregando el producto ${row.producto} al carrito`);
        cy.log(`Agregando el producto ${row.precio} al carrito`);
    });
});

Then('el total a pagar debería ser {int}', (totalEsperado) => {
    cy.log(`Agregando el producto ${totalEsperado} al carrito`);
});

