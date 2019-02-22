'use strict';

module.exports = (sequelize, DataTypes) => {
  const country = sequelize.define('country', {
    idCountry: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nameCountry: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate:{
        validateLength: (nameCountry) =>{
            const length = nameCountry.length;
            if(length < 1)
                return Promise.reject({field: 501, error: 100});
            else if(length > 60)
                return Promise.reject({field: 501, error: 101})
        }
    }
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  });

  country.associate = function(models) {
  };
  return country;
};