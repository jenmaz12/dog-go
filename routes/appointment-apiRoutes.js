/* eslint-disable func-names */
const db = require('../models');

module.exports = function (app) {
  // Get all available appointments
  app.get('/api/appointments', (req, res) => {
    db.Appointment.findAll({
      where: {
        available: true,
      },
    }).then((dbAppointments) => {
      res.json(dbAppointments);
    });
  });

  // Create a new appointment when walker inputs their schedule
  app.post('/api/appointments', (req, res) => {
    db.Appointment.create({
      date: req.body.date,
      startTime: req.body.startTime,
      walkerChosen: req.body.walkerChosen,
    }).then((dbAppointment) => {
      res.json(dbAppointment);
    });
  });

  // Create a new customer when a customer signs up
  app.post('/api/customers', (req, res) => {
    db.Customer.create({
      name: req.body.name,
      petName: req.body.petName,
      email: req.body.email,
      phone: req.body.phone,
    }).then((dbCustomer) => {
      res.json(dbCustomer);
    });
  });

  // update appointment when customer books it (available now false,
  // attach customerID to appointment, input overnight option if applicable)
  app.put('/api/appointments/:id', (req, res) => {
    db.Appointment.update({
      available: false,
      customerID: req.body.customerID,
      overnightChosen: req.body.overnightChosen,
    }, {
      where: {
        id: req.params.id,
      },
    })
      .then((dbPost) => {
        res.json(dbPost);
      });
  });

  // Delete an appointment by id (when the walker is no longer available at that time)
  // For a customer to cancel an appointment, do an update
  // so timeslot is available to other customers
  app.delete('/api/appointments/:id', (req, res) => {
    db.Appointment.destroy({ where: { id: req.params.id } }).then((dbAppointment) => {
      res.json(dbAppointment);
    });
  });
};
