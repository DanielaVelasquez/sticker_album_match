'use strict';

module.exports = (sequelize, DataTypes) => {
  const city = sequelize.define('city', {
    idCity: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nameCity: {
      allowNull: false,
      type: DataTypes.STRING,
      validate:{
          validateLength: (nameCity) =>{
              const length = nameCity.length;
              if(length < 1)
                  return Promise.reject({field: 501, error: 100});
              else if(length > 60)
                  return Promise.reject({field: 501, error: 101})
          }
      }
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  city.associate = function(models) {
    models.city.belongsTo(models.country);
  };

  return city;
};