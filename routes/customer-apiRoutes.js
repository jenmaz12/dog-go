const db = require('../models');

module.exports = function (app) {
  // Grab all the customers in the DB
  app.get('/api/customers', (req, res) => {
    db.Customer.findAll().then((dbCustomer) => {
      res.json(dbCustomer);
    });
  });

  // Create a new customer when a customer signs up
  app.post('/api/customers', (req, res) => {
    db.Customer.create({
      name: req.body.name,
      petName: req.body.petName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    }).then((dbCustomer) => {
      res.json(dbCustomer);
    });
  });


  // app.get('/api/authors/:id', (req, res) => {
  //   // Here we add an "include" property to our options in our findOne query
  //   // We set the value to an array of the models we want to include in a left outer join
  //   // In this case, just db.Post
  //   db.Author.findOne({
  //     where: {
  //       id: req.params.id,
  //     },
  //     include: [db.Post],
  //   }).then((dbAuthor) => {
  //     res.json(dbAuthor);
  //   });
  // });
  // app.delete('/api/authors/:id', (req, res) => {
  //   db.Author.destroy({
  //     where: {
  //       id: req.params.id,
  //     },
  //   }).then((dbAuthor) => {
  //     res.json(dbAuthor);
  //   });
  // });
};
