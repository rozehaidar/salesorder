sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("ap.salesorder.controller.SalesOrderDetail", {
            onInit: function () {
                let oRouter = this.getOwnerComponent().getRouter()
                oRouter.getRoute("master").attachPatternMatched(this._onSalesOrderMatched, this);
                oRouter.getRoute("detail").attachPatternMatched(this._onSalesOrderMatched, this);
            },
            _onSalesOrderMatched: function (oEvent) {
                let sSalesOrderID = oEvent.getParameter("arguments").salesOrder || "0";
                this.getView().bindElement({
                    path: `/SalesOrderSet('${sSalesOrderID}')`
                    // ,
                    // parameters: {
                    //     $expand: "Customer_SalesSet",
                    //     $filter: "Kunnr eq '" + sCustomerID +  "'"
                    // }
                });
                this.getView().byId("SalesOrderItemsTable").bindItems({
                    path: `/SalesOrderSet('${sSalesOrderID}')/SalesOrderItemsSet`,
                    template: this.getView().byId("SalesOrderItemsTable").getBindingInfo("items").template
                });
            },

            onExit: function () {
                this.oRouter.getRoute("list").detachPatternMatched(this._onProductMatched, this);
                this.oRouter.getRoute("detail").detachPatternMatched(this._onProductMatched, this);
            }
        });
    });