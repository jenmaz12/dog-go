const db = require('../models');

module.exports = function (app) {
  // Grab all the walkers in the DB
  app.get('/api/walkers', (req, res) => {
    db.Walker.findAll().then((dbWalker) => {
      res.json(dbWalker);
    });
  });

  // Create a new walker when a walker signs up
  app.post('/api/walkers', (req, res) => {
    db.Walker.create({
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    }).then((dbWalker) => {
      res.json(dbWalker);
    });
  });
};
