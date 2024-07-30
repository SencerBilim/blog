import express from "express";
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

let posts = [];

app.get('/', (req, res) => {
    res.render('index', { posts: posts });
  });
  
  app.post('/posts', (req, res) => {
    const post = {
      id: Date.now().toString(),
      title: req.body.title,
      content: req.body.content,
    };
    posts.push(post);
    res.redirect('/');
  });
  
  
  app.post('/posts/edit/:id', (req, res) => {
    const postId = req.params.id;
    const post = posts.find(post => post.id === postId);
    if (post) {
      post.title = req.body.title;
      post.content = req.body.content;
    }
    res.redirect('/');
  });

  app.post('/posts/delete/:id', (req, res) => {
    const postId = req.params.id;
    posts = posts.filter(post => post.id !== postId);
    res.redirect('/');
  });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });