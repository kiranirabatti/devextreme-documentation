//<!--@Knockout-->
var myViewModel = {
    listDataSource: new DevExpress.data.DataSource({
        store: [],
        group: function (dataItem) {
            return dataItem.name.charAt(0);
        }
    }),
    collapseGroups: ko.observable(true)
}
ko.applyBindings(myViewModel);
$.get("/Content/data/states.txt", function (data) {
    for (var i = 0; i < data.length; i++) {
        myViewModel.listDataSource.store().insert(data[i]);
    }
    myViewModel.listDataSource.load();
}, "json");
//<!--/@Knockout-->
//<!--@AngularJS-->
var myApp = angular.module('myApp', ['dx']);
myApp.controller("demoController", function ($scope) {
    $scope.listDataSource = new DevExpress.data.DataSource({
        store: [],
        group: function (dataItem) {
            return dataItem.name.charAt(0);
        }
    });
    $scope.collapseGroups = true;
    $.get("/Content/data/states.txt", function (data) {
        for (var i = 0; i < data.length; i++) {
            $scope.listDataSource.store().insert(data[i]);
        }
        $scope.listDataSource.load();
    }, "json");
});
angular.element(document).ready(function () {
    angular.bootstrap(document, ['myApp']);
});
//<!--/@AngularJS-->
//<!--@jQuery-->
var listDataSource = new DevExpress.data.DataSource({
    store: [],
    group: function (dataItem) {
        return dataItem.name.charAt(0);
    }
});
$("#myList").dxList({
    height: '80%',
    dataSource: listDataSource,
    grouped: true,
    collapsibleGroups: true,
    itemTemplate: function (itemData, itemIndex, itemElement) {
        itemElement.append("<p style=\"font-size:larger;\"><b>" + itemData.name + "</b></p>");
        itemElement.append("<p>Capital: <i>" + itemData.capital + "</i></p>");
    }
});
$("#collapsibleSelector").dxSwitch({
    value: true,
    onValueChanged: function (e) {
        $("#myList").dxList("instance").option("collapsibleGroups", e.value);
    }
});
$.get("/Content/data/states.txt", function (data) {
    for (var i = 0; i < data.length; i++) {
        listDataSource.store().insert(data[i]);
    }
    listDataSource.load();
}, "json");
//<!--/@jQuery-->