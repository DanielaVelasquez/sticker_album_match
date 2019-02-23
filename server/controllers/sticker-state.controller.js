var models          = require('../models');
var util = require('../util');
var mensaje = require('../messages/estadoficha');

var getStickerState = (stickerState) =>
{
  return new Promise((resolve, reject) =>{
    models.stickerState.findOne({
      where:{
        stickerState
      }
    })
    .then(stickerState =>{
      if(stickerState)
        resolve(stickerState);
      else 
        reject();
    })
    .catch(err =>reject());
  });

}

module.exports = {
    getStickerState
}