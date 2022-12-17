const express = require ('express');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');

const customerRouter = require ('./routes/signupRouter');
const postRouter = require ('./routes/postRoutes');

const app = express ();
app.use (express.json ());
app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({extended: true}));
app.use (express.static ('./views'));

app.get ('/', (req, res) => {
  res.render ('index.html');
});

// app.use("/user", router);
app.use('/api', customerRouter);
app.use ('/api/posts', postRouter);

//DATA_BASE COLLECTION
mongoose.connect ('mongodb://127.0.0.1:27017/exam-post');
mongoose.connection.on ('connected', () => {
  console.log ('CONNECTED TO DATA BASE ');
});
mongoose.connection.on ('error', err => {
  console.log ('oops! error occured', err);
});

// listen port for server
const port = process.env.PORT || 5000;
app.listen (port, () => console.log (`Listening on port ${port}...`));

module.exports = app;
