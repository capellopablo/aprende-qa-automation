export class BenefitsBlock {
    constructor() {

        this.section = ".block b-benefits-v2";
        this.layout = false;
        this.settings = {};
        // this.fields = {
        //     firstName: "input#firstName",
        //     lastName: "input#lastName",
        //     email: "input#email",
        //     phone: "input#phoneRaw",
        //     optIn: "[name='OptInWhatsApp']",
        //     areaOfInterest: "#mui-component-select-area_of_interest",
        // }
        // this.button = "#formSubmitButton";
    }

    exists() {
        cy.get(this.section).should("be.visible")
    }
}


export const benefitsBlock = new BenefitsBlock();
