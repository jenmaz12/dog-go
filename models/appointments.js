module.exports = function (sequelize, DataTypes) {
  const Appointment = sequelize.define('Appointment', {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    walkerChosen: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    customerID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    overnightChosen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    timestamps: false,
  });
  return Appointment;
};
