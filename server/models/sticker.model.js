'use strict';
module.exports = (sequelize, DataTypes) => {
  const sticker = sequelize.define('sticker', {
    idSticker: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    numberSticker: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  });
  sticker.associate = function(models) {
    models.sticker.belongsTo(models.album);
  };
  return sticker;
};