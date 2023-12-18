sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/Device',
    'sap/f/library',
    '../util/SortAndFilterHelper',
    'sap/ui/export/Spreadsheet',
    'sap/ui/export/library'
], function (Controller, Device, fioriLibrary, SortAndFilterHelper, Spreadsheet, exportLibrary) {
    "use strict";

    return Controller.extend("ap.salesorder.controller.Main", {
        onInit: function () {
            this._mViewSettingsDialogs = {};
        },

        onListItemPress: function(oEvent) {
            let sSalesOrderPath = oEvent.getSource().getBindingContext().getPath(),
                oSelectedSalesOrder = sSalesOrderPath.split("'")[1];
        
            this.getOwnerComponent().getRouter().navTo("detail", {
                layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded,
                salesOrder: oSelectedSalesOrder
            });
        },
        

        onNavToSalesOrderItems: function () {
            this.getOwnerComponent().getRouter().navTo("SalesOrderItems");
        },

        handleSortButtonPressed: function () {
            SortAndFilterHelper.handleSortButtonPressed(this, "ap.salesorder.fragments.sortDialog");
        },

        handleSortDialogConfirm: function (oEvent) {
            SortAndFilterHelper.handleSortDialogConfirm(oEvent, this, "SalesOrderTable");
        },

        handleFilterGo: function () {
            SortAndFilterHelper.handleFilterBarGo(this, 'SalesOrderTable');
        },

        onExport: function () {
            let aCols, oRowBinding, oSettings, oSheet, oTable;

            oTable = this.getView().byId("SalesOrderTable");
            oRowBinding = oTable.getBinding('items');
            aCols = this.createColumnConfig();

            oSettings = {
                workbook: {
                    columns: aCols,
                    hierarchyLevel: 'Level'
                },
                dataSource: oRowBinding,
                fileName: 'Table export sample.xlsx',
                worker: false
            };

            oSheet = new Spreadsheet(oSettings);
            oSheet.build().finally(function () {
                oSheet.destroy();
            });
        },

        createColumnConfig: function () {
            let aCols = [];
            let EdmType = exportLibrary.EdmType;

            aCols.push({
                label: 'Id',
                property: ['Vbeln'],
                type: EdmType.String,
                template: 'Whatever you want - {0}'
            });

            aCols.push({
                label: 'Name',
                type: EdmType.String,
                property: 'Name',
                scale: 0
            });

            aCols.push({
                property: 'Erdat',
                type: EdmType.String
            });

            return aCols;
        }
    });
});
