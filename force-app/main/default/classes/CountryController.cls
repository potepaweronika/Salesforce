public with sharing class CountryController {
    @AuraEnabled(cacheable=true)
    public List<String> getCountryOptions() {
        List<Country_Tax_Rate__c> taxRates = [SELECT Country__c FROM Country_Tax_Rate__c];
        List<String> countryOptions = new List<String>();
        for (Country_Tax_Rate__c taxRate : taxRates) {
            countryOptions.add(taxRate.Country__c);
        }
        System.debug('opcje: '+countryOptions);
        return countryOptions;
    }
}