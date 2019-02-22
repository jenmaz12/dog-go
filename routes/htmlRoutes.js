const path = require('path');
const db = require('../models');

module.exports = function (app) {
  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/customer', (req, res) => {
    res.render('forms/customer');

    app.get('/calendar', (req, res) => {
      // send back the home page
      res.render('calendar');
      // res.send('this works');
    });

    app.get('/walker', (req, res) => {
      res.render('forms/walker');
    });
  });
};
