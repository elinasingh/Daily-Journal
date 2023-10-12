
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require('mongoose');

const homeStartingContent = "A lake or an easy weekend is what God wants to decorate it with. Always the author, nor the time of life. Let it be a course of action. Viverra lived in this place. Do not use a microwave oven or a dishwasher. Until the basketball players are not members or members of the arc. Mattis the employee was targeted by the students. The mountains will give birth to a great push, and a ridiculous mouse will be born in the ultricia of life. I'm trying to find a way to get rid of the poison bed. The author of the life of Ultrices advocates football as a bed of alcohol to drink. Odio euismod lacinia at quis risus sed vulputate odio ut The course of the real estate agent was aimed at the students.";
const aboutContent = "It is said that he lived in this street, and that it was the vestibule of the children. It is said that the vestibulum of the rhoncus is a corporal punishment. It is not just a fancy vestibule. The street was said to be clear of arrows. But you need a smile at the price of what vulputate dignissim has suspended. Let's get into some salad. Always smile in the hendrerit gravida rutrum every one not the land of the orci. He likes the massa vitae tortor sauce lacinia quis or eros. For the earth is the element of the arrows of life. Mauris ultrices eros in the course of the university mass tincidunt dui.";

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/blogDB", {useNewUrlParser: true, 
 useUnifiedTopology: true});

 const postSchema = new mongoose.Schema({
  title: String,
  content: String
 })

 const Post = mongoose.model('Post', postSchema);

// let posts = [];

app.get("/", async function(req, res){
 try{
  const posts = await Post.find({})
  //console.log(posts);
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });

 } catch (err) {
  console.log(err);
 }
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

app.get("/posts/:postId", async function(req, res){
  const requestedPostId = req.params.postId;
  // const requestedTitle = _.lowerCase(req.params.postName);
   // posts.forEach(function(post){
  //   const storedTitle = _.lowerCase(post.title);

  //   if (storedTitle === requestedTitle) {
  //     res.render("post", {
  //       title: post.title,
  //       content: post.content
  //     });
  //   }
  // });
try {
  const post = await Post.findOne({ _id: requestedPostId});
   if(!post) {
    res.render("error", {message: "Post not found"});
   } else {
    res.render("post", {
      title: post.title,
      content: post.content
    })
   }
} catch (err) {
  console.log(err);
}

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact");
});

app.post('/contact', (req, res) => {
  const { yourName, yourEmail, yourMessage } = req.body;

  const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
  });
  const Message = mongoose.model('Message', messageSchema);

  const newMessage = new Message({
    name: yourName,
    email: yourEmail,
    message: yourMessage
  });

  newMessage.save()
  .then(() => {
    res.redirect('/');
  })
  .catch(err => {
    console.error(err);
    res.send("There was an error saving your message. Please try again.");
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
