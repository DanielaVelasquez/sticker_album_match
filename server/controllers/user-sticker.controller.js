
var models = require('../models');
var { GOT_STATE } = require('../util/states.util');

/**
 * Find or creates the user-sticker object from username ans sticker
 * @param {object} sticker sticker in the user-sticker objet
 * @param {integer} userName user who owns the sticker
 */
var findOrCreateUserSticker = (sticker, user) =>
{
    return models.userSticker.findOrCreate({
        where:{
          stickerIdSticker: sticker.get('idSticker'),
          userIdUser: user.get('idUser')
        },
        defaults:{
          stickerStateIdStickerState: 1
        }
      });
}

/**
 * Updates the user-sticker, if the new state is 'got' then it is erased
 * @param {*} userSticker the user-sticker
 * @param {*} stickerState new state for the user-sticker
 */
var updateUserSticker = (userSticker,  stickerState) =>
{
  var idUserSticker = userSticker.get('idUserSticker');
  console.log("--->"+idUserSticker)
  //The new state is  GOT, then the user-sticker is erased
  if(stickerState.get('stickerState') == GOT_STATE)
  {
    return models.userSticker.destroy({
      where: {
        idUserSticker
      }
    });
  }
  else
  {
    return userSticker.setStickerState(stickerState);
    /*return models.userSticker.update({
        stickerStateIdStickerState: stickerState.get('stickerState')
      },{
        where:{
          idUserSticker
        }
      }

    );*/
    
  }
  
}

module.exports = {
  findOrCreateUserSticker,
  updateUserSticker
}