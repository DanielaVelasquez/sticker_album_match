'use strict';
module.exports = (sequelize, DataTypes) => {
  var album = sequelize.define('album', {
    idAlbum: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nameAlbum: {
      allowNull: false,
      type: DataTypes.STRING
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  });
  album.associate = function(models) {
   
  };
  return album;
};