const path = require('path');
const db = require('../models');

module.exports = function (app) {

  app.get('/', (req, res) => {
    // send back the home page
    res.render('index');
    // res.send('this works');
  });
};
