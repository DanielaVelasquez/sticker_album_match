var { users } = require('./user.seed');
var { albums } = require('./album.seed');
var { stickerStates } = require('./sticker-state.seed');
var stickerStateController  = require('../controllers/sticker-state.controller');
var stickerController       = require('../controllers/sticker.controller');
var userStickerController   = require('../controllers/user-sticker.controller');
var { REPEATED_STATE, MISSING_STATE } = require('../util/states.util');
var userController          = require('../controllers/user.controller');
var models = require('../models');

const stickers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var fill = () =>{
    Promise.all([models.user.bulkCreate(users),
                 models.album.bulkCreate(albums),
                 models.stickerState.bulkCreate(stickerStates)])
    .then(([usersCreated, albums])=>{
        //Creates sticker for each album
        albums.forEach(album =>{
            stickers.forEach(numberSticker =>{
                models.sticker.create({numberSticker, albumIdAlbum: album.get('idAlbum')});
            });
        });

        setTimeout(function(){ 
            //assign stickers missing and repeated to each user
            assignStickerToUser();
            //Create sticker persistence for each album
            albums.forEach(album =>{
                createStickers(users, album.get('idAlbum'));
            })
        }, 5000);

        


    })
    .catch((err)=>console.log(err));
}

var assignStickerToUser = () =>
{
    users[0].missing = [1, 2, 3, 4, 5];
    users[0].repeated = [6, 7, 8];

    users[1].missing = [1, 4, 7];
    users[1].repeated = [2, 5, 10];

    users[2].missing = [3];
    users[2].repeated = [1, 2, 7, 8, 9, 10];

    users[3].missing = [2, 3, 4];
    users[3].repeated = [1];
}

var createStickers = (users, idAlbum) =>{
    users.forEach(user =>{
        //Creating missing stickers
        user.missing.forEach(number =>{
            createStickerUser(number, idAlbum, MISSING_STATE, user.userName);
        });

        //Creating repeated stickers
        user.repeated.forEach(number =>{
            createStickerUser(number, idAlbum, REPEATED_STATE, user.userName);
        });
    })
}

var createStickerUser = (numberSticker, idAlbum, stickerState,username) =>{
    var stickerPromise = stickerController.getSticker(numberSticker, idAlbum);
    var stickerStatePromise = stickerStateController.getStickerState(stickerState);
    var userPromise = userController.getuser(username);
    
    Promise.all([stickerPromise, stickerStatePromise, userPromise])
    .then(([sticker, stickerState, user])=>{
        if(sticker && stickerState && user)
        {
            userStickerController.findOrCreateUserSticker(sticker,user)
            .then((userStickerFound) =>{
                userStickerController.updateUserSticker(userStickerFound[0], stickerState);
            });
        }
    })
    .catch((err)=>console.log(`Error: ${JSON.stringify(err)}`))
}

module.exports = {
    fill
}