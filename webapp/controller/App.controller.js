sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("ap.salesorder.controller.App", {
        
        onInit: function () {
          this.getOwnerComponent().getRouter().attachRouteMatched(this.onRouteMatched, this)
        },

        onRouteMatched: function (oEvent) {
          let oSettingsModel = this.getOwnerComponent().getModel("settings")
          oSettingsModel.setProperty("/RouteName", oEvent.getParameter("name")),
          oSettingsModel.setProperty("/SalesOrderItem", oEvent.getParameter("arguments").SalesOrderItems);
        },
        onStateChanged: function (oEvent) {
          let oSettingsModel = this.getOwnerComponent().getModel("settings")
          let bIsNavigationArrow = oEvent.getParameter("isNavigationArrow"),
            sLayout = oEvent.getParameter("layout");

          // Replace the URL with the new layout if a navigation arrow was used
          if (bIsNavigationArrow) {
            this.oRouter.navTo(oSettingsModel.getProperty("/RouteName"), {layout: sLayout, SalesOrderItems: oSettingsModel.getProperty("/SalesOrderItem")}, true);
          }
        },
        onExit: function () {
          this.getOwnerComponent().getRouter().detachRouteMatched(this.onRouteMatched, this);
        },

      });
    }
  );
  