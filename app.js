
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require('mongoose');

const homeStartingContent = "A lake or an easy weekend is what God wants to decorate it with. Always the author, nor the time of life. Let it be a course of action. Viverra lived in this place. Do not use a microwave oven or a dishwasher. Until the basketball players are not members or members of the arc. Mattis the employee was targeted by the students. The mountains will give birth to a great push, and a ridiculous mouse will be born in the ultricia of life. I'm trying to find a way to get rid of the poison bed. The author of the life of Ultrices advocates football as a bed of alcohol to drink. Odio euismod lacinia at quis risus sed vulputate odio ut The course of the real estate agent was aimed at the students.";
const aboutContent = "It is said that he lived in this street, and that it was the vestibule of the children. It is said that the vestibulum of the rhoncus is a corporal punishment. It is not just a fancy vestibule. The street was said to be clear of arrows. But you need a smile at the price of what vulputate dignissim has suspended. Let's get into some salad. Always smile in the hendrerit gravida rutrum every one not the land of the orci. He likes the massa vitae tortor sauce lacinia quis or eros. For the earth is the element of the arrows of life. Mauris ultrices eros in the course of the university mass tincidunt dui.";
const contactContent = "Scelerisque eleifend until the price vulputate sapien. Roncus urn is neither cartoon nor basketball. Let us live with the bow of God, let us drink the bow of the cat. It will be followed by the education of the family of the sad family. Risus viverra adipiscing at in the whole land of feugiat. It is not wise to drink the bow of life that is expected from arrows. The result is sometimes a lot of real estate. But now the target is the propaganda lake. Sometimes putting the internet itself is a pain in the ass. For the whole element of the pillow is neither. The pregnant woman was told that there was no clinical placement. Mauris is in some sort of environment as a disease. To put a twister and to always cartoon for free.";

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/blogDB", {useNewUrlParser: true, 
 useUnifiedTopology: true});

 const postSchema = new mongoose.Schema({
  name: String,
  content: String
 })

 const Post = mongoose.model('Post', postSchema);

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save();
  // posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
