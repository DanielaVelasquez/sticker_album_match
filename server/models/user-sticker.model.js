'use strict';
module.exports = (sequelize, DataTypes) => {
  var userSticker = sequelize.define('userSticker', {
    idUserSticker: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    }
  },
   {
     freezeTableName: true,
     timestamps: false
   });
  userSticker.associate = function(models) {
    models.userSticker.belongsTo(models.stickerState);
    models.userSticker.belongsTo(models.user);
    models.userSticker.belongsTo(models.sticker);
  };
  return userSticker;
};