const db = require('../models');

module.exports = function (app) {
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

  app.get('/api/walkers', (req, res) => {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Walker.findAll({
    }).then((dbWalker) => {
      res.json(dbWalker);
    });
  });

  app.get('/api/walkers/:id', (req, res) => {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Walker.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.Appointment],
    }).then((dbWalker) => {
      res.json(dbWalker);
    });
  });

  app.delete('/api/walkers/:id', (req, res) => {
    db.Walker.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbWalker) => {
      res.json(dbWalker);
    });
  });
};
