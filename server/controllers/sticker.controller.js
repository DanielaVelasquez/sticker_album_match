
var models = require('../models');


/**
 * Gets the sticker object from its number and album
 * @param {integer} numberSticker number in the sticker
 * @param {integer} idAlbum identifier of the album
 */
var getSticker = (numberSticker, idAlbum) =>
{
    return models.sticker.findOne({
        where: {
          numberSticker
        },
        include: [{
          model: models.album,
          where:{
            idAlbum
          }
        }]
      });
    
}

module.exports = {
    getSticker
  }