import { LightningElement, wire, track } from 'lwc';
import getCountryOptions from '@salesforce/apex/CountryController.getCountryOptions';

export default class CalculateTax extends LightningElement {
    @track selectedCountry = '';
    @track calculatedTax = 0;
    @track countryOptions = [];

    // Load country options from the server
    @wire(getCountryOptions)
    wiredCountryOptions({ data, error }) {
        if (data) {
            this.countryOptions = data;
        } else if (error) {
            // Handle error
        }
    }

    // Handle country selection
    handleCountryChange(event) {
        this.selectedCountry = event.detail.value;
        this.calculateTax();
    }

    // Calculate tax based on the selected country
    calculateTax() {
        // Replace this with a call to a server-side method to retrieve the tax rate
        // and calculate the tax amount based on the selected country.
        // You should create an Apex method for this purpose.
        // Example: YourApexClass.calculateTax(this.selectedCountry)
        InvoiceCalculator.calculateTax(this.selectedCountry);
    }
}
