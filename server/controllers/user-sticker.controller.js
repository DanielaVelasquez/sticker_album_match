
var models = require('../models');
var { GOT_STATE } = require('../util/states.util');

/**
 * Find or creates the user-sticker object from username ans sticker
 * @param {object} sticker sticker in the user-sticker objet
 * @param {integer} userName user who owns the sticker
 */
var findOrCreateUserSticker = (sticker, userName) =>
{
    return models.userSticker.findOrCreate({
        include: [{
            model: models.sticker,
            where: {
                idSticker: sticker.get('idSticker')
            }
          },{
            model: models.usuario,
            where: {
              userName
            }
          }]
      });
}

var updateUserSticker = (userSticker, newStickerState, user, stickerState,sticker) =>
{
  
  //The new state is  GOT, then the user-sticker is erased
  if(newStickerState == GOT_STATE)
  {
    return models.userSticker.destroy({
      where: {
        idUserSticker: userSticker.get('idUserSticker')
      }
    });
  }
  else
  {
    return userSticker.setStickerState(stickerState);
  }
  
}

module.exports = {
  findOrCreateUserSticker,
  updateUserSticker
}