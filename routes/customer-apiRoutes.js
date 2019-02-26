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
};
