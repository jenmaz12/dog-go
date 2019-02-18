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
    }).then((dbAppointment) => {
      res.json(dbAppointment);
    });
  });

  app.put('/api/appointments/:id', (req, res) => {
    db.Appointment.update({ available: false },
      {
        where: {
          id: req.params.id,
        },
      })
      .then((dbPost) => {
        res.json(dbPost);
      });
  });

  // Delete an example by id
  app.delete('/api/appointments/:id', (req, res) => {
    db.Example.destroy({ where: { id: req.params.id } }).then((dbExample) => {
      res.json(dbExample);
    });
  });
};
