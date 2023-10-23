import { LightningElement, wire, track, api } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
// import INVOICE_OBJECT from '@salesforce/schema/Invoice__c';
import calculateTaxForCountry from '@salesforce/apex/InvoiceCalculator.calculateTaxForCountry';
import getCountryOptions from '@salesforce/apex/CountryController.getCountryOptions';

const FIELDS = ["Invoice__c.Amount__c", "Invoice__c.Country__c"];

export default class CalculateTax extends LightningElement {
    @api recordId;
    @track selectedCountry = '';
    @track tax = 0;
    @track calculatedTax = 0;
    @track countryOptionsProxy = [];
    countryOptions = ["test1", "test2"];

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    wiredInvoice({ error, data }) {
        if (data) {
            this.invoice = data;
            this.calculateTax(); // Recalculate tax when the invoice data changes
        } else if (error) {
            console.error('Error fetching invoice:', error);
        }
    }


    // Load country options from the server
    @wire(getCountryOptions)
    wiredCountryOptions({ data, error }) {
        if (data) {
            this.countryOptionsProxy = data;
            this.countryOptions = JSON.parse(JSON.stringify(this.countryOptionsProxy));
        } else if (error) {
            return 0;
        }
    }

    get options() {
        return this.countryOptions.map(country => ({ label: country, value: country }));;
    }

    // Handle country selection
    handleCountryChange(event) {
        this.selectedCountry = event.detail.value;
        this.calculateTax();
    }

    // Calculate tax based on the selected country
    calculateTax() {
        if (this.selectedCountry && this.recordId) {
            // Calculate tax
            this.tax = calculateTaxForCountry({ amount: this.invoice.fields.Amount__c.value, country: this.selectedCountry })
              .then(value => {
                this.calculatedTax = value;
              })
              .catch((err) => {
                console.error(err);
              });
        } else {
            // Handle the case where no country is selected or invoice data is not available
            console.log('No country selected or invoice data not available');
        }
    }
}