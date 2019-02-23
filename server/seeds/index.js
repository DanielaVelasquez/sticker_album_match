var { users } = require('./user.seed');
var { albums } = require('./album.seed');
var { stickerStates } = require('./sticker-state.seed');

var models = require('../models');


var fill = () =>{
    Promise.all([models.user.bulkCreate(users),
                 models.album.bulkCreate(albums),
                 models.stickerState.bulkCreate(stickerStates)])
    .then(([users, albums])=>{
        
    })
    .catch((err)=>console.log(err));
}

module.exports = {
    fill
}