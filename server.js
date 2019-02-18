
// Dependencies
var express = require('express');
var exphbs = require('express-handlebars');

// Require models for syncing
var db = require('./models');

// Sets up express app
var app = express();
var PORT = process.env.PORT || 3000;
var syncOptions = { force: false };

require('dotenv').config();

// Middleware
// Sets up express app to handle data parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Static directory
app.use(express.static('public'));

// Handlebars
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
  }),
);
app.set('view engine', 'handlebars');

// Routes
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);


// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === 'test') {
  syncOptions.force = true;
}

// Syncing our sequelize models and then starting our Express App----------------/
db.sequelize.sync(syncOptions).then(() => {
  app.listen(PORT, () => {
    console.log(
      '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
      PORT,
      PORT,
    );
  });
});
