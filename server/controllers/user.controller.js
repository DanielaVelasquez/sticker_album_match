
var models = require('../models');


/**
 * Gets the user object from its userName
 * @param {string} userName 
 */
var getuser = (userName) =>
{
    return new Promise((resolve, reject)=>{
        models.user.findOne({
            where: {
                userName
            }
        })
        .then((user)=>{
            if(user)
                resolve(user);
            else
                reject({field: 300, error: 103});
        })
        .catch((err)=>reject(err))
    })
    
}

module.exports = {
    getuser
}