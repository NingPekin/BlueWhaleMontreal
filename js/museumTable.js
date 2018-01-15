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

function MuseumContent()
{
     var museumTableContent=
     [
     ["","Museum Name","Popular Percentage","Add to List"],
     ["","Montreal Museum of Fine Arts","100%",""],
     ["","Pointe-à-Callière Museum","80%",""],
     ["","Redpath Museum","80%",""],
     ["","The Montreal Museum of Contemporary Art","70%",""]
    ];    
    return museumTableContent; 
}

function generate_table() 
{
    // get the reference for the body
    var body = document.getElementsByTagName("body")[0];
    var section=document.getElementById("museum-list");
    // creates a <table> element and a <tbody> element
    var tbl = document.createElement("table");
    tbl.className+='table';
    tbl.className+=' table-hover';
    var tblBody = document.createElement("tbody");
    var tableContent=MuseumContent();

  for (var i = 0; i < 5; i++) 
  {
    // creates a table row
    var row = document.createElement("tr");
    for (var j = 0; j < 4; j++)
     {    
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
      if(j==0)
      {
        var cell = document.createElement("td");
        var icon_check=document.createElement("span");
        icon_check.className ="material-icons ";
        icon_check.className +=tableContent[i][1];
        icon_check.innerText="search";
        icon_check.id=tableContent[i][1];       
        cell.appendChild(icon_check);
        row.appendChild(cell);
      }
      if(j==3&&i!=0)
      {
        var cell = document.createElement("td");
        var icon = document.createElement("span"); 
        icon.className ="material-icons";
        icon.innerText="add_circle_outline";
        icon.id=tableContent[i][1];       
        cell.appendChild(icon);
        row.appendChild(cell);
      }
      else
      {
      var cell = document.createElement("td");
      var cellText = document.createTextNode(tableContent[i][j]);
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

function addListToUser(name,listname)
{

    getUserInfo();
    // list:{username1:[list1,list2,list3],
    //   username2:[list1,list2,list3]} 
    var isduplicated=false;
    var isFirstList=false;
    var indexOfUser;
    indexOfUser=(userinfo.username).indexOf(name);
      // if not logged  
    if(indexOfUser==-1)
    {
      alert("Please loggin at first");
      return 0;
    }
    var objList=JSON.parse(JSON.stringify(userinfo.list))[indexOfUser];
    var listforuser=objList[name];
    for (var i=0;i<listforuser.length;i++) 
    {
      //duplicated
      if(listforuser[i]==listname)
      {
        isduplicated=true;
        alert("it's already in your list");
        return 0;
      }   
    }

      listforuser.push(listname);
      objList[name]=listforuser;
      userinfo.list[indexOfUser]=objList;
      localStorage.setItem("list",JSON.stringify(userinfo.list));  
      alert(listname+" is added to your list!");
  }


  function view_image(listname)
  {
    if(listname=="Montreal Museum of Fine Arts")
    {
 
  window.open('pic/Montreal Museum of Fine Arts.jpg','name','width=600,height=400')
    }
      if(listname=="Pointe-à-Callière Museum")
    {
        window.open('pic/Pointe-à-Callière Museum.jpg','name','width=600,height=400')


    }
          if(listname=="Redpath Museum")
    {
        window.open('pic/Redpath Museum.jpg','name','width=600,height=400')


    }
            if(listname=="The Montreal Museum of Contemporary Art")
    {
        window.open('pic/The Montreal Museum of Contemporary Art.jpg','name','width=600,height=400')


    }

  }