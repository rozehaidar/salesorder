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
            var sSalesOrderID = oEvent.getParameter("arguments").salesOrder || "0";
          var sSalesPath = `/SalesOrderSet('${sSalesOrderID}')`;
 
          this.getView().bindElement({
            path: sSalesPath
          });
 
          var oTable = this.getView().byId("SalesOrderItemsTable");
          oTable.bindItems({
            path: sSalesPath + "/SalesOrderItemsSet",
            template: oTable.getBindingInfo("items").template,
          
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
