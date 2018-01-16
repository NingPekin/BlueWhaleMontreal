var userinfo = 
{
  "username": [],
  "email": [],
  "password": [],   
  "list":[],
  "status":[]
};



var myApp = angular.module("myApp", ['ngCookies']);
myApp.controller("RegisterCtrl",function ($scope,$cookieStore,$cookies,$window)
 {
    $scope.cancelRegister=function()
    {
        window.history.back();
    };

    $scope.saveUser=function()
    {
        
        currentusername=$scope.username;
        currentemail=$scope.email;
        currentpassword=$scope.password;     
        var isAlreadyInserted = false;
       
        //retrive user from localstorage into userinfo, if user exists 
        if (localStorage.getItem("username")!=null )
        {
            getUserInfo();          
        }

        // set localStorage to operate registration

        //loop through your username array to check
        for (var i=0;i<userinfo.username.length;i++) 
            {               
                console.log(userinfo.username[i]);
                console.log(currentusername);
                if (currentusername === userinfo.username[i])
                {
                    isAlreadyInserted = true;
                    alert("This username is alreardy registered");
                    return;
                }
              
            }   
        
            //if the username is not in the array, register it
            if (!isAlreadyInserted) 
            {
                userinfo.username.push(currentusername);
                userinfo.password.push(currentpassword);
                userinfo.email.push(currentemail);
                var objList={};
                // alert(objList);
                var listforuser=[];
                // listforuser.push("null");
                objList[currentusername]=listforuser;
                // userinfo.list.push(JSON.stringify(objList));
                userinfo.list.push(objList);    
                userinfo.status.push("default");        
                console.log(userinfo);
                localStorage.setItem('username',  JSON.stringify(userinfo.username));
                localStorage.setItem('password', JSON.stringify(userinfo.password));
                localStorage.setItem('email',  JSON.stringify(userinfo.email));
                localStorage.setItem('list',  JSON.stringify(userinfo.list));
                localStorage.setItem('status',  JSON.stringify(userinfo.status));
                alert("Register Successfully");
                $window.location.href = "HomePage.1.html";
                return userinfo.username+userinfo.password;

            }
        
    };
});

function getUserInfo()
{
        userinfo.username=JSON.parse(localStorage.getItem("username"));
        userinfo.email=JSON.parse(localStorage.getItem("email"));
        userinfo.password=JSON.parse(localStorage.getItem("password"));  
        userinfo.list=JSON.parse(localStorage.getItem("list"));
        
        userinfo.status=JSON.parse(localStorage.getItem("status"));  
        console.log("getuserinfo"+userinfo.list);
    
}