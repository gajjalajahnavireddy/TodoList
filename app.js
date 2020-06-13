//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
let items = ["Pay rent","Pay bills","Pay loan"];
let workItems =[];
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine','ejs');
app.get("/", function(req, res){
 let today = new Date();
 let option = {
   weekday: "long",
   day: "numeric",
   month: "long"
 };
 let day = today.toLocaleDateString("en-US",option);
 res.render("list" , { listtitle: day,newlistitems: items });
});
app.post("/",function(req,res){
  let item =  req.body.newitem;
  if(req.body.list === "Work")
  {
    workItems.push(item);
    res.redirect("/work");
  }
  else {
    items.push(item);
    res.redirect("/");
  }


})
app.get("/work",function(req,res){
  res.render("list" , { listtitle: "Work List",newlistitems: workItems });
});
app.post("/work",function(req,res){
let item =  req.body.newitem;
workItems.push(item);
res.redirect("/");
})
app.listen(5000, function(){
  console.log("Server started on port 5000.");
});
