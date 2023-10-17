import { LightningElement, wire, track } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import INVOICE_OBJECT from '@salesforce/schema/Invoice__c';
import calculateTax from '@salesforce/apex/InvoiceCalculator.calculateTax';
import getCountryOptions from '@salesforce/apex/CountryController.getCountryOptions';

export default class CalculateTax extends LightningElement {
    @track selectedCountry = '';
    @track calculatedTax = 0;
    @track countryOptions = [];
    @track invoiceId; // Store the selected invoice record Id

    @wire(getRecord, { recordId: '$invoiceId', fields: [INVOICE_OBJECT.Country__c, INVOICE_OBJECT.Amount__c] })
    invoice;

    // Load country options from the server
    @wire(getCountryOptions)
    wiredCountryOptions({ data, error }) {
        if (data) {
            this.countryOptions = data;
        } else if (error) {
            return 0;
        }
    }

    // Handle country selection
    handleCountryChange(event) {
        this.selectedCountry = event.detail.value;
        this.calculateTax();
    }

    // Calculate tax based on the selected country
    calculateTax() {
        if (this.selectedCountry && this.invoice.data) {
            calculateTax({ invoice: this.invoice.data, selectedCountry: this.selectedCountry })
                .then(result => {
                    this.calculatedTax = result;
                })
                .catch(error => {
                    // Handle any errors from the server call
                    console.error('Error calculating tax: ' + JSON.stringify(error));
                });
        } else {
            // Handle the case where no country is selected or invoice data is not available
        }
    }
}


// import { LightningElement, wire, track } from 'lwc';
// import getCountryOptions from '@salesforce/apex/CountryController.getCountryOptions';
// import getTaxRateForCountry from '@salesforce/apex/InvoiceCalculator.getTaxRateForCountry';

// export default class CalculateTax extends LightningElement {
//     @track selectedCountry = '';
//     @track calculatedTax = 0;
//     @track countryOptions = [];

//     // Load country options from the server
//     @wire(getCountryOptions)
//     wiredCountryOptions({ data, error }) {
//         if (data) {
//             this.countryOptions = data;
//         } else if (error) {
//             // Handle error
//             return 0;
//         }
//     }

//     // Handle country selection
//     handleCountryChange(event) {
//         this.selectedCountry = event.detail.value;
//         this.calculateTax();
//     }

//     // Calculate tax based on the selected country
//     calculateTax() {
        
//     }
// }
