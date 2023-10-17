public with sharing class InvoiceSumController {
    @AuraEnabled
    public static Decimal getInvoiceTotal(String propertyId) {
        Decimal totalAmount = 0.0;

        List<Invoice__c> invoices = [SELECT Amount__c FROM Invoice__c WHERE inv_prop_rel__c = :propertyId];
        for (Invoice__c invoice : invoices) {
            totalAmount += invoice.Amount__c;
        }

        return totalAmount;
    }
}