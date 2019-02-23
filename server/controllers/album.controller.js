
var models = require('../models');


/**
 * Gets an album object from its if
 * @param {integer} idAlbum identifier of the album
 */
var getAlbum = (idAlbum) =>
{
  return new Promise((resolve, reject) =>{
    models.album.findOne({
      where: {
        idAlbum
      }
    })
    .then((album)=>{
      if(album)
        resolve(album)
      else
        reject({field: 400, error: 103})
    })
    .catch((err)=>reject(err))
  });
}

module.exports = {
    getAlbum
  }