
var models = require('../models');


/**
 * Gets the user object from its userName
 * @param {string} userName 
 */
var getuser = (userName) =>
{
    return models.user.findOne({
        where: {
            userName
        }
      });
    
}

module.exports = {
    getuser
  }