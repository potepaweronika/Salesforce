({
    doInit: function (component, event, helper) {
        var recordId = component.get("v.recordId");
        helper.getInvoiceTotal(component, recordId);
    }
})
