export class CookieDisclaimer {
    constructor() {

        this.parent = "";
        this.container = "";
        this.selector = "div.cookie-disclaimer-container.show-cookie";
        this.button = ".btn-primary.cookie-disclaimer-remove";
    }

    close() {
        cy.get('body').then($body => {
            if ($body.find(this.selector).length) {
                // Element exists
                cy.get(this.button).click()
            } else {
                cy.log('Coockie banner does not exist');
            }
        });
    }

}


export const cookieDisclaimer = new CookieDisclaimer();
