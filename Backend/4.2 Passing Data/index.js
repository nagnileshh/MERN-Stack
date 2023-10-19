import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var nameL = 0;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  nameL = req.body.fName.length + req.body.lName.length;
  res.render("index.ejs", { length: nameL });
  // res.send(`<h1>Your band name is:</h1><h2>${nameL}✌️</h2>`);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
