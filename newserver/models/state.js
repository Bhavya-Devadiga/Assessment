module.exports = (sequelize, DataTypes) => {
    const state = sequelize.define('state', {
      stateId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      countryId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stateName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return state;
  };