// Create web server
// 1. Create a web server
// 2. Handle root request
// 3. Handle /comments request
// 4. Handle /add-comment request
// 5. Handle /delete-comment request
// 6. Handle /edit-comment request
// 7. Handle /comments/:id request
// 8. Handle /comments/:id/edit request

// 1. Create a web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const comments = require('./comments');
const methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// 2. Handle root request
app.get('/', (req, res) => {
  res.redirect('/comments');
});

// 3. Handle /comments request
app.get('/comments', (req, res) => {
  res.render('index', { comments: comments });
});

// 4. Handle /add-comment request
app.post('/add-comment', (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment });
  res.redirect('/comments');
});

// 5. Handle /delete-comment request
app.delete('/delete-comment', (req, res) => {
  const { commentIndex } = req.body;
  comments.splice(commentIndex, 1);
  res.redirect('/comments');
});

// 6. Handle /edit-comment request
app.put('/edit-comment', (req, res) => {
  const { commentIndex, comment } = req.body;
  comments[commentIndex].comment = comment;
  res.redirect('/comments');
});

// 7. Handle /comments/:id request
app.get('/comments/:id', (req, res) => {
  const { id } = req.params;
  res.render('show', { comment: comments[id], id });
});

// 8. Handle /comments/:id/edit request
app.get('/comments/:id/edit', (req, res) => {
  const { id } = req.params;
  res.render('edit', { comment: comments[id], id });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});







