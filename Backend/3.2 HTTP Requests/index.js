import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, Brother.");
});

app.get("/contact", (req, res) => {
  res.send("Contact me on 9867383175.");
});

app.get("/about", (req, res) => {
  res.send("My name is Nilesh Nag. I am a full stack React developer.");
});

app.listen(3000, () => {
  console.log("Hi");
});
