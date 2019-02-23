
const express = require('express');
const exphbs = require('express-handlebars');
const moment = require('moment');

const db = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;
const syncOptions = { force: false };

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
require('./routes/appointment-apiRoutes')(app);
require('./routes/customer-apiRoutes')(app);
require('./routes/walker-apiRoutes')(app);
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

module.exports = app;
