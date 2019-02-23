'use strict';

module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    idUser:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userName:{
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate:{
        validateLength: (userName) =>{
            const length = userName.length;
            if(length < 3)
                return Promise.reject({field: 100, error: 100});
            else if(length > 16)
                return Promise.reject({field: 100, error: 101})
        }
      }
    },
    latitudUser:{
      allowNull: false,
      type: DataTypes.DOUBLE,
      validate:{
        validateDataType: (latitudUser) =>{
          if(isNaN(parseFloat(latitudUser)))
            return Promise.reject({field: 101, error: 104});
        }
      }
    },
    longitudUser:{
      allowNull: false,
      type: DataTypes.DOUBLE,
      validate:{
        validateDataType: (longitudUser) =>{
          if(isNaN(parseFloat(longitudUser)))
            return Promise.reject({field: 102, error: 104});
        }
      }
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });
  user.associate = function(models) {
    
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