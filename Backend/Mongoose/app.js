import mongoose from "mongoose"

mongoose.connect("mongodb://localhost:27017/fruitsDB")

const { Schema, model } = mongoose;

const blogSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  author: String,
});

const Blog = model('Blog', blogSchema);

const user = new Blog({
  title: "Uski bahot yaad aati hai",
  author: "Nilesh Nag",
});

// user.save()

const personSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  age: Number,
  city: String,
});

const Person = model('Person', personSchema);

const p1 = new Person({
  name: "Nilesh Nag",
  age: 23,
  city: "Mumbai"
});

const p2 = new Person({
  name: "Pravin Nag",
  age: 20,
  city: "Mumbai"
});

// p2.save()

async function getItems() {
  const items = await Person.find({})
  const entries = Object.entries(items)
  // console.log(entries)
  printData(entries)
  // console.log(entries[0], typeof(entries))
}
function printData(data) {
  // console.log("data", data[0][1].name)
  data.forEach(element => {
    console.log(element[1].name)
  });
}

getItems();
// console.log(data, typeof(data))

// data.forEach(element => {
//   console.log(element.name)
// });

// Person.find(function(err, people) {
//   if(err) {
//     console.log(err)
//   } else {
//     console.log(people)
//   }
// })