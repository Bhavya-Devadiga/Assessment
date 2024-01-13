module.exports = (sequelize, DataTypes) => {
    const country = sequelize.define('country', {
      // Define your model fields here
      countryId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      countryName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

    });
  
    return country;
  };