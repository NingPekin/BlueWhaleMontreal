  
(function () 
{
'use strict';
angular
    .module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
    .controller('DemoCtrl', DemoCtrl);
function DemoCtrl ($timeout, $q, $log,$window,$location) {
    var self = this;
    self.simulateQuery = false;
    self.isDisabled    = false;

    // list of `state` value/display objects
    self.list        = loadAll();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;
    self.goToResult=goToResult;


function goToResult(text)
{
if(text=="Metro")
{
// alert(text);
$window.location.href = "MetroPage.html";
}
else if(text=="Church")
{
// alert(text);
$window.location.href = "ChurchPage.html";
}
else if(text=="Museum")
{
// alert(text);
$window.location.href = "MuseumPage.html";
}
}       
function querySearch (query) {
var results = query ? self.list.filter( createFilterFor(query) ) : self.list,
  deferred;
if (self.simulateQuery) {
deferred = $q.defer();
$timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
return deferred.promise;
} else {
return results;
}
}

function searchTextChange(text) {
$log.info('Text changed to ' + text);
}

function selectedItemChange(item) {
$log.info('Item changed to ' + JSON.stringify(item));
}

/**
* Build `states` list of key/value pairs
*/
function loadAll() 
{
var allLists = 'Church, Metro, Museum';

return allLists.split(/, +/g).map( function (list) {
return {
  value: list.toLowerCase(),
  display: list
};
});
}

/**
* Create filter function for a query string
*/
function createFilterFor(query) 
{
var lowercaseQuery = angular.lowercase(query);

return function filterFn(list) {
return (list.value.indexOf(lowercaseQuery) === 0);
};

}


}
})();    

