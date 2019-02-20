module.exports = function (sequelize, DataTypes) {
  const Walker = sequelize.define('Walker', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 12],
      },
    },
  }, {
    timestamps: false,
  });
  return Walker;
};
