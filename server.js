var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var CardGame = require('./models/cardGame');

var app = express();

// Connect to the mongoCardGamer database in MongoDB
mongoose.connect('mongodb://localhost/mongoCardGamer');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Serve our static assets (including our React app)
app.use(express.static(path.resolve(__dirname, 'client', 'build')));

// API route to get all card games from DB
app.get('/api/cardgames', (req, res) => {
  console.log("You've hit the API 'find all' endpoint");
  // Find all card games...
  CardGame.find({}, function(err, cardGames) {
    if (err) {
      console.log("There was a db error");
      res.send(err);
    } else {
      console.log("Got games from DB!")
      // This is the raw array of game objects
      res.send(cardGames);
    }
  });
});

// API route to post a new card game to DB
app.post('/api/cardgames', (req, res) => {
  console.log("You've hit the API 'create one' endpoint");
  // Add your code here to create a new game in the DB...
  // console.log(req.body);
  CardGame.create({
    name: req.body.name,
    minPlayers: req.body.minPlayers,
    maxPlayers: req.body.maxPlayers
  })
  .then((err, game) => {
    if (err){
      console.log(err);
      res.send(err);
    } else {
      console.log(game);
      res.send(game);
    }
  })
});

// Wildcard route for delivering the React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// Start the server on PORT
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

module.exports = app;
