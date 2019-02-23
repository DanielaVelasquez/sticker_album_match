
var models = require('../models');


/**
 * Gets the sticker object from its number and album
 * @param {integer} numberSticker number in the sticker
 * @param {integer} idAlbum identifier of the album
 */
var getSticker = (numberSticker, idAlbum) =>
{
  return new Promise((resolve, reject) =>{
    models.sticker.findOne({
      where: {
        numberSticker
      },
      include: [{
        model: models.album,
        where:{
          idAlbum
        }
      }]
    })
    .then((sticker)=>{
      if(sticker)
        resolve(sticker)
      else
        reject({field: 300, error: 103})
    })
    .catch((err)=>reject(err))
  });
}

module.exports = {
    getSticker
  }