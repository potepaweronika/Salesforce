@isTest
public class InvoiceCalculatorTest {

    @isTest
    static void testCalculateTaxForSingleRecord() {
        // Create a test Country_Tax_Rate__c record
        Country_Tax_Rate__c taxRate = new Country_Tax_Rate__c(Country__c = 'USA', Tax__c = 0.1);
        insert taxRate;

        // Create a test Invoice__c record
        Invoice__c invoice = new Invoice__c(Name = 'Test Invoice', Country__c = 'USA', Amount__c = 100.0, Status__c = 'Awaiting payment');
        insert invoice;

        // Call the method and verify the result
        Decimal tax = InvoiceCalculator.calculateTax(invoice);
        System.assertEquals(10.0, tax);
    }

    @isTest
    static void testCalculateTaxForSingleRecordWithMissingTaxRate() {
        // Create a test Invoice__c record for a country with no tax rate
        Invoice__c invoice = new Invoice__c(Name = 'Test Invoice', Country__c = 'UK', Amount__c = 100.0, Status__c = 'Awaiting payment');
        insert invoice;

        // Call the method and verify that it handles missing tax rates correctly
        Decimal tax = InvoiceCalculator.calculateTax(invoice);
        System.assertEquals(0.0, tax);
    }

    @isTest
    static void testCalculateTaxForListOfRecords() {
        // Create test Country_Tax_Rate__c records for USA and Canada
        Country_Tax_Rate__c taxRateUSA = new Country_Tax_Rate__c(Country__c = 'USA', Tax__c = 0.1);
        Country_Tax_Rate__c taxRateCanada = new Country_Tax_Rate__c(Country__c = 'UK', Tax__c = 0.05);
        insert new List<Country_Tax_Rate__c>{taxRateUSA, taxRateCanada};

        // Create a list of test Invoice__c records with different countries
        List<Invoice__c> invoices = new List<Invoice__c>{
            new Invoice__c(Name = 'Invoice 1', Country__c = 'USA', Amount__c = 100.0, Status__c = 'Awaiting payment'),
            new Invoice__c(Name = 'Invoice 2', Country__c = 'UK', Amount__c = 200.0, Status__c = 'Awaiting payment')
        };
        insert invoices;

        // Call the method to calculate tax for the list of records
        List<Decimal> taxes = InvoiceCalculator.calculateTaxForInvoices(invoices);

        // Verify the results
        System.assertEquals(10.0, taxes[0]);
        System.assertEquals(10.0, taxes[1]);
    }

    @isTest
    static void testCalculateTaxForListOfRecordsWithMissingTaxRate() {
        // Create a list of test Invoice__c records with different countries
        List<Invoice__c> invoices = new List<Invoice__c>{
            new Invoice__c(Name = 'Invoice 1', Country__c = 'USA', Amount__c = 100.0, Status__c = 'Awaiting payment'),
            new Invoice__c(Name = 'Invoice 2', Country__c = 'UK', Amount__c = 200.0, Status__c = 'Awaiting payment')
        };
        insert invoices;

        // Call the method to calculate tax for the list of records
        List<Decimal> taxes = InvoiceCalculator.calculateTaxForInvoices(invoices);

        // Verify the results
        System.assertEquals(0.0, taxes[0]);
        System.assertEquals(0.0, taxes[1]);
    }
}
