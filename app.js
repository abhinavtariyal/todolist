const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname+"/date.js");
const app = express();
var items = ["buy food","cook food", "eat food"];
let workItems = [];
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get('/',function(req,res){
  let dayTime = date.getDay();
res.render("lists",{kindOfDay:dayTime,listItem : items})     //render a file called lists, pass a single variable called kindOfDay
});

app.get("/work",function(req,res){
  res.render("lists",{kindOfDay : "WorkList", listItem : workItems});
})

app.post("/",function(req,res){
  // console.log(req.body);
  let item = req.body.todo;
  if(req.body.list === "WorkList")
  {
    workItems.push(item);
    res.redirect("/work");
  }
  else
  {
    items.push(item);
    res.redirect("/");
  }
})

app.get("/about",function(req,res){
    res.render("about");
})

app.listen(process.env.PORT || 3000,function(){
  console.log("server started at port 3000");
})
