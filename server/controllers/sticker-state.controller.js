var models = require('../models');

/**
 * Gets the sticker state object according to its name
 * @param {string} stickerState sticker state name e.g: missing
 */
var getStickerState = (stickerState) =>
{
  return models.stickerState.findOne({
    where:{
      stickerState
    }
  });
}

module.exports = {
    getStickerState
}