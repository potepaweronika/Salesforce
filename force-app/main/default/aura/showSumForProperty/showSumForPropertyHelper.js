({
    getInvoiceTotal: function (component, propertyId) {
        var action = component.get("c.getInvoiceTotal");
        action.setParams({ propertyId: propertyId });

        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.totalInvoices", response.getReturnValue());
            }
        });

        $A.enqueueAction(action);
    }
})
