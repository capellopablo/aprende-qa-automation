import {addTimestampToEmail, getRandomCountry, getRandomSchool, getToday} from "../../support/helper";

export class LeadForm {
    constructor() {

        this.parent = "";
        this.selector = "div.r-form_multistep.r-form__vertical";
        this.button = "#formSubmitButton";
        this.leadData = {};

        this.fields = {
            firstName: "input#firstName",
            lastName: "input#lastName",
            email: "input#email",
            country: "input#phoneRaw",
            phone: "input#phoneRaw",
            optIn: "[name='OptInWhatsApp']",
            areaOfInterestInput: "[name='area_of_interest']",
            areaOfInterestSelect: "#mui-component-select-area_of_interest",
            areaOfInterestOptions: ".MuiPaper-root.MuiPaper-elevation",
        }

        this.honeypotFields = {
            first_name: "input#first_name",
            last_name: "input#last_name",
            user_email: "input#user_email",
        }

        this.api = {
            lead: {
                get: Cypress.config('APIBaseUrl') + "lead/v1/list",
                process: Cypress.config('APIBaseUrl') + "lead/v1/process",
                delete: Cypress.config('APIBaseUrl') + "lead/v1/delete",
            },
        }

    }



    setParent(parent) {
        this.parent = parent;
    }

    setLeadData(data) {
        cy.log("-- SET LEAD DATA--")
        cy.log(data)
        this.leadData = data;
    }





    getParent() {
        return this.parent;
    }

    getSelector() {
        return this.getParent() === "" ? this.selector : `${this.getParent()} ${this.selector}`;
    }

    getButton() {
        return this.button;
    }

    getLeadData (field = false ) {
        return field ? this.leadData[field] : this.leadData;
    }

    getFields () {
        return this.fields
    }

    getField(field) {
        return this.getParent() === "" ? this.fields[field] : `${this.getParent()} ${this.fields[field]}`;
    }

    getHoneypotFields () {
        return this.honeypotFields
    }

    getHoneypotField(field) {
        return this.getParent() === "" ? this.honeypotFields[field] : `${this.getParent()} ${this.honeypotFields[field]}`;
    }








    fillField (field, value) {
        cy.get(this.getField(field)).type(value)
    }

    fillHoneypotField (field, value) {
        cy.get(this.getHoneypotField(field)).type(value)
    }

    fillFirstName(firstName) {
        cy.get(`${this.getSelector()} ${this.fields.firstName}`).type(firstName)
    }

    fillLastName(lastName) {
        cy.get(`${this.getSelector()} ${this.fields.lastName}`).type(lastName)
    }

    fillEmail(email) {
        cy.get(`${this.getSelector()} ${this.fields.email}`).type(email)
    }

    fillPhone(phone) {
        cy.get(`${this.getSelector()} ${this.fields.phone}`).type(phone)
    }

    pickAreaOfInterest(value) {
        cy.get(`${this.getSelector()} ${this.fields.areaOfInterestSelect}`).click()
        cy.get(`${this.fields.areaOfInterestOptions}`).should("be.visible")
        cy.get(`${this.fields.areaOfInterestOptions}`).getByDataValue(value).click()
    }

    checkWhatsAppOptIn() {
        cy.get(`${this.getSelector()} ${this.fields.optIn}`).click()
    }

    submit() {
        cy.get(`${this.getSelector()} ${this.getButton()}`).click()
    }


    generateLeadData(customLeadData = {} )  {
        const defaultLeadData = {
            firstName: "Lead",
            lastName: "Automation",
            email: addTimestampToEmail("lead_automation@aprende.dev"),
            phone: false,
            country: "us",
            optIn: true,
            areaOfInterest: "bartender",
        }

        const leadData = {...defaultLeadData, ...customLeadData}

        if (!leadData.phone) {
            leadData.phone = this.generateLeadPhone(leadData.country)
        }

        this.setLeadData(leadData)
        return leadData;
    }

    generateLeadPhone (country = "us", state = false) {
        country.toLowerCase();

        const phones = {
            us: 4654564654,
            mx: 4545646545,
            co: 4654654465,
            ar: 1158961328,
        }

        return phones[country];
    }

    generateLeadUTMs (format = "object", source = "fb") {

        let utms = {}

        switch ( source ) {
            case "google":
                utms = {
                    utm_source: "google",
                    utm_medium: "cpc",
                    utm_campaign: `${getToday()}-${getRandomCountry()}-${getRandomSchool().toLowerCase()}-TIER2`,
                    utm_term: "escuela de uñas en español cerca de mi",
                    utm_content: `${getToday()}-${getRandomCountry()}-${getRandomSchool().toLowerCase()}-TIER2-AD3`,
                    device:"c",
                    ad_position:1,
                    ad_id:570961279346,
                    match_type:"e",
                    network:"g",
                    adgroupid:128283196261,
                }
                break

            case "fb":
            default:
                utms = {
                    utm_source: "fb",
                    utm_medium: "Facebook_Desktop_Feed",
                    utm_campaign: `${getToday()}-${getRandomCountry()}-${getRandomSchool().toUpperCase()}-SALES_LOOKALIKE1_WOMEN-DESKTOP`,
                    utm_term: "120201161323854983-120201161323854298-120201161323741388",
                    utm_content: `${getToday()}-${getRandomCountry()}-${getRandomSchool().toUpperCase()}-SALES_LOOKALIKE1_WOMEN-DESKTOP-AD3`,
                    device:"c",
                    ad_position:1,
                    ad_id:570961279346,
                    match_type:"e",
                    network:"g",
                    adgroupid:128283196261,
                }
                break
        }

        if ( format === "string" ) {
            const split = Object.entries(utms).map(([index, value]) => `${encodeURIComponent(index)}=${encodeURIComponent(value)}`);
            return split.join('&');
        }

        return utms;
    }





    /****** API *******/

    getLeads() {
        cy.request({
            method: 'POST',
            url: this.api.lead.get,
            headers: {
                'Content-Type': 'application/json',
                // Agrega cualquier header adicional requerido por tu API
            },
            body: {
                email: "all",
                limit: 10,
            }
        }).then((response) => {
            cy.log(response.body.results)

            // Verifica el status code de la respuesta
            // expect(response.status).to.eq(201); // 201 es comúnmente usado para indicar "Creado"

            // Verifica algunas propiedades del usuario creado en la respuesta
            // expect(response.body).to.have.property('name', 'Juan Pérez');
            // expect(response.body).to.have.property('email', 'juan@example.com');

            // Puedes agregar más aserciones aquí según sea necesario
        });
    }

    getLead(email) {
        cy.request({
            method: 'POST',
            url: this.api.lead.get,
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                email: email,
                limit: 1,
            }
        }).then((response) => {
            cy.log("-- GET LEAD FROM DB --")
            cy.log(response.body.results[0])
            cy.wrap(response.body.results[0]).as('leadData');
        });
    }


    processLead(email) {
        cy.log(this.api.lead.process)

        cy.request({
            method: 'POST',
            url: this.api.lead.process,
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                email: email,
                limit: 1,
                destination: "all"
            }
        }).then((response) => {
            cy.log("-- PROCESS LEAD FROM DB --")
            cy.log(response.body.results[0])
            cy.wrap(response.body.results[0]).as('leadData');
        });
    }
}


export const leadForm = new LeadForm();
