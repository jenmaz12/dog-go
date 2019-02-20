const db = require('../models');

module.exports = function (app) {
  // Create a new walker when a walker signs up
  app.post('/api/walkers', (req, res) => {
    db.Walker.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    }).then((dbWalker) => {
      res.json(dbWalker);
    });
  });

  app.get('/api/walkers', (req, res) => {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Walker.findAll({
      include: [db.Appointment],
    }).then((dbWalker) => {
      res.json(dbWalker);
    });
  });
};
