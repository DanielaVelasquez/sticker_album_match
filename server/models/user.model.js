'use strict';

module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    idUser:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nameUser:{
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate:{
        len: {
          args: [3, 20],
          //msg: mensaje.nombreUserLongitud()
        }
      }
    },
    passwordUser:{
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3, 255],
          //msg: mensaje.contrasenaLongitud()
        }
      }
    },
    emailUser:{
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        isEmail:{
          args: true,
          //msg: mensaje.correoErroneo()
        }
      }
    },
    latitudUser:{
      allowNull: false,
      type: DataTypes.DOUBLE
    },
    longitudUser:{
      allowNull: false,
      type: DataTypes.DOUBLE
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });
  user.associate = function(models) {
    models.user.belongsTo(models.city);
  };
  /*user.findByToken = function(token){
    try
    {
      var decoded = jwt.verify(token, constants.secret_token)
      return User.findOne({where: {tokenUser: token}});
    }
    catch (e)
    {
      return Promise.reject();
    }
  };
  User.prototype.generateToken = function () {
    var access = 'auth'
    var token = jwt.sign({id: this.idUser, access}, constants.secret_token).toString();
    User.update(
      {tokenUser: token},
      {where: {idUser: this.idUser}}
    )
    return token;
  }*/
  return user;
};