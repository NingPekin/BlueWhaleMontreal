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

function ListContent()
{
     var listContent=
    [
    ["Montreal Museum of Fine Arts","100%","pic/Montreal Museum of Fine Arts.jpg"],
    ["Pointe-à-Callière Museum","80%","pic/Pointe-à-Callière Museum.jpg"],
    ["Redpath Museum","80%","pic/Redpath Museum.jpg"],
    ["The Montreal Museum of Contemporary Art","70%","pic/The Montreal Museum of Contemporary Art.jpg"],
    ["Guy-Concordia","100%","pic/Guy-Concordia.jpg"],
    ["Atwater","80%","pic/atwater.jpg"],
    ["Peel","80%","pic/peel.jpg"],
    ["Mcgill","80%","pic/mcgill.jpg"],
    ["Basilique Notre-Dame de Montréal","100%","pic/Basilique Notre-Dame de Montréal.jpg"],
    ["Saint Patrick's Basilica","80%","pic/Saint Patricks Basilica.jpg"],
    ["L’Oratoire Saint-Joseph du Mont-Royal","80%","pic/L’Oratoire Saint-Joseph du Mont-Royal.jpg"],
    ["Cathedrale Marie-Reine-du-Monde","80%","pic/Cathedrale Marie-Reine-du-Monde.jpg"]
    ];    
    return listContent; 
}

function getUserList()
{
    var loggeduser=returnUsername();
    getUserInfo();
    var indexOfUser=(userinfo.username).indexOf(loggeduser);
    var objList=JSON.parse(JSON.stringify(userinfo.list))[indexOfUser];
    var listforuser=objList[loggeduser];
    var tableContent=ListContent();
    var foundList=[];

    for (var index = 0; index < listforuser.length; index++)
      {
        console.log(listforuser[index]);   
        // alert(listforuser[index]);
      }
      var body = document.getElementsByTagName("body")[0];
      var section=document.getElementById("my-list");
      // creates a <table> element and a <tbody> element
      var tbl = document.createElement("table");
      tbl.className+='table';
      tbl.className+=' table-hover';
      var tblBody = document.createElement("tbody");
  for (var i = 0; i < listforuser.length; i++) 
  {
      foundList=findListByName(listforuser[i]);
    // creates a table row
      var row = document.createElement("tr");
      for (var j = 0; j < 3; j++)
      {    
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
      if(j==0)
      {
        var cell = document.createElement("td");
        var icon_check=document.createElement("span");
        icon_check.className ="material-icons ";
        icon_check.className +=listforuser[i];
        icon_check.innerText="search";
        icon_check.id=listforuser[i];       
        cell.appendChild(icon_check);
        row.appendChild(cell);
      }
      else
      {
      var cell = document.createElement("td");
      var cellText = document.createTextNode(foundList[j-1]);
      cell.appendChild(cellText);
      row.appendChild(cell);
      }
      }
    // add the row to the end of the table body
      tblBody.appendChild(row);
       }
 
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    section.appendChild(tbl);
    // sets the border attribute of tbl to 2;
    tbl.setAttribute("border", "0");
       
}

function findListByName(listname)
{
    var listTable=ListContent();
    var foundlist=[];
    for(var i=0;i<listTable.length;i++)
    {
      // alert(listTable.length);
      if(listTable[i][0]==listname)
      {
        foundlist=listTable[i];

      }
    }
    // alert(foundlist);
    return foundlist;


}

function view_image(listname)
  {
    var foundlist=findListByName(listname);
    var imgSource=foundlist[2];
    window.open(imgSource,'name','width=600,height=400');


  }