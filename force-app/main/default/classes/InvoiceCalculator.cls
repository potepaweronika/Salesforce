public with sharing class InvoiceCalculator {
    public static List<Decimal> calculateTaxForInvoices(List<Invoice__c> invoices) {
        List<Decimal> taxes = new List<Decimal>();
        
        for (Invoice__c invoice : invoices) {
            Decimal tax = calculateTax(invoice);
            taxes.add(tax);
        }
        
        return taxes;
    }

    @AuraEnabled(cacheable=true)
    public static Decimal calculateTaxForCountry(Decimal amount, String country) {
        // Query the Country_Tax_Rate__c object to get the tax rate based on the country
        List<Country_Tax_Rate__c> taxRateRecords = [SELECT Tax__c FROM Country_Tax_Rate__c WHERE Country__c = :country LIMIT 1];

        if (taxRateRecords.size() > 0) {
            // Retrieve the tax rate from the query result
            Decimal taxRate = taxRateRecords[0].Tax__c;

            // Calculate tax based on the retrieved tax rate
            Decimal tax = amount * taxRate;
            return tax;
        } else {
            return 0;
        }
    }


    @AuraEnabled(cacheable=true)
    public static Decimal calculateTax(Invoice__c invoice) {
        String country = invoice.Country__c;
        
        // Query the Country_Tax_Rate__c object to get the tax rate based on the country
        List<Country_Tax_Rate__c> taxRateRecords = [SELECT Tax__c FROM Country_Tax_Rate__c WHERE Country__c = :country LIMIT 1];

        if (taxRateRecords.size() > 0) {
            // Retrieve the tax rate from the query result
            Decimal taxRate = taxRateRecords[0].Tax__c;
            
            // Calculate tax based on the retrieved tax rate
            Decimal subtotal = invoice.Amount__c;
            Decimal tax = subtotal * taxRate;
            return tax;
        } else {
            return 0;
        }
    }
}
