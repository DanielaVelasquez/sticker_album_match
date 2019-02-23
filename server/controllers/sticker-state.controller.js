var models = require('../models');

/**
 * Gets the sticker state object according to its name
 * @param {string} stickerState sticker state name e.g: missing
 */
var getStickerState = (stickerState) =>
{
  return new Promise((resolve, reject)=>{
    models.stickerState.findOne({
      where:{
        stickerState
      }
    })
    .then((stickerState)=>{
      if(stickerState)
        resolve(stickerState)
      else  
        reject({field: 200, error: 103})
    })
    .catch((err)=>reject(err))
  })
}

module.exports = {
    getStickerState
}