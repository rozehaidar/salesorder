sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("ap.salesorder.controller.SalesOrderDetail", {
        onInit: function () {
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("master").attachPatternMatched(this._onSalesOrderMatched, this);
            oRouter.getRoute("detail").attachPatternMatched(this._onSalesOrderMatched, this);
        },

        _onSalesOrderMatched: function (oEvent) {
            let sSalesOrderID = oEvent.getParameter("arguments").salesOrder || "0";
            let that = this;

            // Read the Sales Order details
            this.getOwnerComponent().getModel().read(`/SalesOrderSet('${sSalesOrderID}')`, {
                urlParameters: {
                    "$format": "json",
                    "$expand": "SalesOrderItemsSet"
                },
                success: function (oData) {
                    console.log("Sales Order Data:", oData);
        
                    // Bind the Sales Order details to the view
                    that.getView().bindElement({
                        path: `/SalesOrderSet('${sSalesOrderID}')`
                    });
        
                    // Create a JSON model for Sales Order Items and bind it to the table
                    let oSalesOrderItemsModel = new sap.ui.model.json.JSONModel(oData.SalesOrderItemsSet);
                    that.getView().byId("SalesOrderItemsTable").setModel(oSalesOrderItemsModel);
                },
                error: function (oError) {
                    // Handle the error
                    console.error("Error reading Sales Order details:", oError);
                }
            });
        },

        onExit: function () {
            // Cleanup logic if needed
        }
    });
});
