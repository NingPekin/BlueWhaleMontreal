"use strict";

var userinfo = 
{
  "username": [],
  "email": [],
  "password": [],   
  "list":[],
  "status":[]
};

function getUserInfo()
{
        userinfo.username=JSON.parse(localStorage.getItem("username"));
        userinfo.email=JSON.parse(localStorage.getItem("email"));
        userinfo.password=JSON.parse(localStorage.getItem("password"));  
        userinfo.list=JSON.parse(localStorage.getItem("list"));
        userinfo.status=JSON.parse(localStorage.getItem("status"));  
        console.log("getuserinfo"+userinfo.list);
    
}



var app = angular.module('MyApp',  ['ngMaterial', 'ngMessages', 'material.svgAssetsCache','ngCookies']);

app.controller('AppController', AppController)
.config(config);

app.controller('DemoCtrl', DemoCtrl);

    function AppController($scope, $mdDialog, $mdMedia, $mdToast) 
    {
     
        this.$scope = $scope;
        this.$mdDialog = $mdDialog;
        this.$mdMedia = $mdMedia;
        this.$mdToast = $mdToast;
        this.status = '';
        
        // this.customFullscreen = this.$mdMedia('xs') || this.$mdMedia('sm');
    }
    AppController.prototype.showDialog = function (event) 
    {
        getUserInfo();
        for(var i=0;i<userinfo.username.length;i++)
        {
            if(userinfo.status[i]=="logged")
            {
                if (confirm("You already login in\nDo you want to log out?") == true) 
                {
                    userinfo.status[i]="default";
                    localStorage.setItem('status', JSON.stringify(userinfo.status));
                }   
                    return 0;         
            }
    
        }

        //not logged in
        var _this = this;
        var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs')) && this.customFullscreen;
        this.$mdDialog.show({
            controller: LoginDialogController,
            controllerAs: 'dialog',
            templateUrl: 'login-template.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true,
            fullscreen: useFullScreen
            
        })
            .then(function (credentials) { return _this.showToast("Thanks for logging in, " + credentials.username + "."); }, function () { return _this.showToast('You canceled the login.'); });
        this.$scope.$watch(function () { return _this.$mdMedia('xs') || _this.$mdMedia('sm'); }, function (wantsFullScreen) { return _this.customFullscreen = wantsFullScreen === true; });
    
    };
    AppController.prototype.showToast = function (content) 
    {
        this.$mdToast.show(this.$mdToast.simple()
            .content(content)
            .position('bottom right')      
            .hideDelay(3000));
    };


var LoginDialogController = (function () {
    function LoginDialogController($mdDialog) {
        this.$mdDialog = $mdDialog;
    }
    LoginDialogController.prototype.hide = function () {
        this.$mdDialog.hide();
    };
    LoginDialogController.prototype.close = function () {
        this.$mdDialog.cancel();
    };
    LoginDialogController.prototype.login = function () 
    {
        //validation of user 
    if (JSON.parse(localStorage.getItem("username"))!=null )
    {
    var isValidUser=false;
    for(var i=0;i<userinfo.username.length;i++)
    {
        if(this.username==userinfo.username[i]&&
            this.password==userinfo.password[i])
        {
            //if logged in,set logged in to status
            isValidUser=true;    
            // alert(storedStatusArray[i]);
            userinfo.status[i]="logged";
            localStorage.setItem('status',JSON.stringify(userinfo.status));
            // alert(storedStatusArray);
            this.$mdDialog.hide({ username: this.username, password: this.password });
        }

    }
    if(isValidUser==false)
    {
        alert("You password or username is not correct!");
    }
    }
    //end if

    };

    return LoginDialogController;
}());




function returnUsername()
{
    getUserInfo();
    for(var i=0;i<userinfo.username.length;i++)
    {
        if(userinfo.status[i]=="logged")
        {            
            return userinfo.username[i];
        }
    }
}


function config($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('orange');
    $mdThemingProvider.theme('input', 'default')
        .primaryPalette('grey');
}


function DemoCtrl ($timeout, $q, $log,$window,$location) 
{
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


   

