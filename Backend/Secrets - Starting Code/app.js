//jshint esversion:6
import dotenv from 'dotenv'
import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import mongoose from "mongoose";
import encrypt from 'mongoose-encryption'
// import md5 from 'md5'
import bcrypt from 'bcrypt'


const port = 3000;
const app = express();
const saltRounds = 10

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

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

  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    const user = new User({ 
      username: req.body.username,
      password: hash
     });
    user
      .save()
      .then(function () {
        res.render("secrets.ejs");
      })
      .catch(function (err) {
        console.log(err);
      });
});
});

app.post("/login", async function (req, res) {
  
  const username = req.body.username;
  const password = req.body.password;

  const d = await User.findOne({ username: username }).then((userDetails) => {
    // console.log(userDetails, "login")
    bcrypt.compare(password, userDetails.password, function(err, result) {
      if (result) {
        res.render("secrets.ejs")
      } else {
        console.log("Please use the valid Username or/and Password.")
      }
  });
  })
});

app.get("/logout", (req, res) => {
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running at Port ${port}`);
});
