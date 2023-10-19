import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import _ from "lodash";

const { Schema, model } = mongoose;

const port = 3000;

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemsSchema = new Schema({
  name: String,
});

const Item = model("item", itemsSchema);

const item1 = new Item({
  name: "Wake up early",
});

const item2 = new Item({
  name: "Run for 30 minutes",
});

const item3 = new Item({
  name: "Go to gym",
});

const defaultItems = [item1, item2, item3];

const lists = ["Go to gym", "Drink water", "Do yoga", "Eat light breakfast"];

app.get("/", async (req, res) => {
  const lists = await Item.find({});

  if (lists.length === 0) {
    Item.insertMany(defaultItems);
    res.redirect("/");
  } else {
    res.render("index.ejs", { title: "Today", list: lists });
  }
});

app.post("/addNewItem", (req, res) => {
  const newItem = new Item({
    name: req.body.newItem,
  });

  if (req.body.listName === "Today") {
    newItem.save();
    res.redirect("/");
  } else {
    List.findOne({ name: req.body.listName }).then((list) => {
      list.items.push(newItem);
      list.save();
      res.redirect("/" + req.body.listName);
    });
  }
});

app.post("/delete", async (req, res) => {
  const listName = req.body.listName;
  const checkItemId = req.body._id;

  console.log(req.body);

  if (listName === "Today") {
    Item.findByIdAndRemove(checkItemId).then((err) => {
      if (err) {
        console.log("Successfully Deleted.");
      }
    });
    res.redirect("/");
  } else {
    List.findOneAndUpdate({ name: listName }, {$pull: {items: {_id: checkItemId}}}).then(() => {
      res.redirect("/" + listName);
    });
  }
});

const listSchema = new Schema({
  name: String,
  items: [itemsSchema],
});

const List = mongoose.model("List", listSchema);

app.get("/:randomList", async (req, res) => {
  const randomListName = _.capitalize(req.params.randomList);
  const lists = await List.find({ name: randomListName }).then(async (list) => {
    if (list.length === 0) {
      const list = new List({
        name: randomListName,
        items: defaultItems,
      });

      list.save();
      res.redirect("/" + randomListName);
    } else {
      res.render("index.ejs", { title: list[0].name, list: list[0].items });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at Port ${port}`);
});
