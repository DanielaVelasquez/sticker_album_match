'use strict';
module.exports = (sequelize, DataTypes) => {
  var stickerState = sequelize.define('stickerState', {
    idStickerState: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    stickerState: {
      allowNull: false,
      type: DataTypes.STRING
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  });
  stickerState.associate = function(models) {
    // associations can be defined here
  };
  return stickerState;
};