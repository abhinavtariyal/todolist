//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://abhinavtariyal:Givememongo%40123@cluster0.xrznq95.mongodb.net/todolist")

const itemSchema = new mongoose.Schema({
  name: String
})

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemSchema]
})

const List = mongoose.model("List", listSchema);

const Item = mongoose.model("Item", itemSchema)

const item1 = new Item({
  name: "Welcome to your todolist!"
})

const item2 = new Item({
  name: "Hit the + button to add a new item"
})

const item3 = new Item({
  name: "<--Hit this to delete an item"
})
const defaultItems = [item1, item2, item3]





app.get("/", function(req, res) {
  Item.find(function(err, items) {
    if (items.length === 0) {
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err)
        } else {
          console.log("success")
        }
      })
      res.redirect("/");
    } else {
      res.render("list", {
        listTitle: "Today",
        newListItems: items
      });
    }

  })
});

app.post("/", function(req, res) {

  const itemName = req.body.newItem;
  const listName = req.body.list;
  const item = new Item({
    name: itemName
  });
  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({
      name: listName
    }, function(err, list) {
      list.items.push(item);
      list.save();
      res.redirect("/" + listName);
    })
  }
})



app.post("/delete", function(req, res) {
      const id = req.body.checkbox;
      const listName = req.body.listName;

      if (listName === "Today") {
        Item.findByIdAndRemove(id, function(err) {
          if (err) {
            console.log("err")
          } else {
            console.log("success")
          }
        })
        res.redirect("/");
      } else {
        List.findOneAndUpdate({
          name: listName
        }, {
          $pull: {
            items: {
              _id: id
            }
          }
        }, function(err, list) {
          if (!err) {
            res.redirect("/") + listName;
          }
        })
      }
    })

      app.get("/:title", function(req, res) {

        const listName = _.capitalize(req.params.title)
        List.findOne({
          name: listName
        }, function(err, list) {
          if (!list) {
            const list = new List({
              name: listName,
              items: defaultItems
            })
            list.save();
            res.redirect("/" + listName);
          }
          else
          {
            res.render("list", {
              listTitle: list.name,
              newListItems: list.items
            })
          }
        })

      })

      app.get("/work", function(req, res) {
        res.render("list", {
          listTitle: "Work List",
          newListItems: workItems
        });
      });

      app.get("/about", function(req, res) {
        res.render("about");
      });

      app.listen(process.env.port||3000, function() {
        console.log("Server started on port 3000");
      });
