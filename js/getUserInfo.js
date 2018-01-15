var userinfo = 
{
  "username": "",
  "email": "",
  "password": "",   
  "list":"",
  "status":"default"
};

function getUserInfo()
{

    userinfo.username=localStorage.getItem("username").split(",");  
    userinfo.email=localStorage.getItem("email").split(",");  
    userinfo.password=localStorage.getItem("password").split(",");  
    userinfo.list=localStorage.getItem("list").split(",");  
    userinfo.status=localStorage.getItem("status").split(",");  
}