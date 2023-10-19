//jshint esversion:6
import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import mongoose from "mongoose";
import encrypt from 'mongoose-encryption'


const port = 3000;
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ['password']})

const User = new mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", (req, res) => {
  const user = new User({ ...req.body });
  user
    .save()
    .then(function () {
      res.render("secrets.ejs");
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.post("/login", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const d = await User.findOne({ username: username }).then((userDetails) => {
    // console.log(userDetails, "login")
    if (userDetails.password === password) {
      res.render("secrets.ejs")
    } else {
      console.log("Please use the valid Username or/and Password.")
    }
  })
});

app.get("/logout", (req, res) => {
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running at Port ${port}`);
});
