var express                 = require('express');
var router                  = express.Router();
var models                  = require('../models');
var { isValidModel }        = require('../util/model.util');
var {userStickerFields}       = require('../util/model.validation');
const handleError           = require('../util/handle-error.util');
var stickerStateController  = require('../controllers/sticker-state.controller');
var stickerController       = require('../controllers/sticker.controller');
var userStickerController   = require('../controllers/user-sticker.controller');
var userController          = require('../controllers/user.controller');
var albumController         = require('../controllers/album.controller');
var { GOT_STATE }           = require('../util/states.util');

router.patch('/update/sticker',(req, res) => {
    const userSticker = req.body;

    if(!isValidModel(userSticker, userStickerFields))
        res.status(400).send({field: 1, error: 1});
    else
    {
        var stickerPromise = stickerController.getSticker(userSticker.numberSticker, userSticker.idAlbum);
        var stickerStatePromise = stickerStateController.getStickerState(userSticker.stickerState);
        var userPromise = userController.getuser(userSticker.userName);

        Promise.all([stickerPromise, stickerStatePromise, userPromise])
        .then(([sticker, stickerState, user])=>{
            if(sticker && stickerState && user)
            {
              userStickerController.findOrCreateUserSticker(sticker,user)
                .then((userStickerFound) =>{
                     return userStickerController.updateUserSticker(userStickerFound[0], stickerState);
                });
            }
        })
        .then(()=>res.send())
        .catch((err)=> handleError(err, res));
    }
});

router.get('/matches/:username/:idAlbum/:distance',(req,res)=>{
    var username = req.params.username;
    var idAlbum = req.params.idAlbum;
    var distance = req.params.distance;

    Promise.all([userController.getuser(username), albumController.getAlbum(idAlbum)])
    .then(([user, album])=>{
        const query = userStickerController.queryMatch(user.get('latitudUser'), user.get('longitudUser'),
                                                    user.get('idUser'),idAlbum,distance);
        return models.sequelize.query(query);
    })
    .then((results)=>res.send(userStickerController.buildListStickers(results[0])))
    .catch((err)=> handleError(err, res));
});

router.post('/matches',(req,res)=>{
    var username = req.body.username;
    var otherusername = req.body.otherusername;
    
    Promise.all([userController.getuser(username), userController.getuser(otherusername)])
    .then(([user1, user2])=>{
        
        const query = userStickerController.matchUsers(user1.get('idUser'), user2.get('idUser'));
        return models.sequelize.query(query);
    })
    .then((results)=>res.send(userStickerController.buildListStickers(results[0])))
    .catch((err)=> handleError(err, res));
});

router.get('/getStickers/username/album/:username/:idAlbum',(req, res)=>{
    var username = req.params.username;
    var idAlbum = req.params.idAlbum;

    Promise.all([userController.getuser(username), albumController.getAlbum(idAlbum)])
    .then(([user, album])=>{
        return userStickerController.getStickerFrom(user.get('idUser'),idAlbum);
    })
    .then((userStickers)=>{
        res.send(userStickerController.createListUserSticker(userStickers));
    })
    .catch((err)=> handleError(err, res));
    
})

router.get('/getStickers/username/stateSticke/album/:username/:idAlbum/:state',(req, res)=>{
    var username = req.params.username;
    var state = req.params.state;
    var idAlbum = req.params.idAlbum;

    if(state == GOT_STATE)
        res.status(400).send({field: 200, error: 106});

    Promise.all([userController.getuser(username), stickerStateController.getStickerState(state), albumController.getAlbum(idAlbum)])
    .then(([user, stickerState, album])=>{
        return userStickerController.getStickerFromState(user.get('idUser'), album.get('idAlbum'), stickerState.get('idStickerState'));
    })
    .then((stickers)=>{
        numbers = []
        for(index in stickers)
        {
            var sticker = stickers[index];
            var num = sticker.sticker.numberSticker;
            numbers.push(num);
        }
        res.send({stickers: numbers});
    })
    .catch((err)=> handleError(err, res));
    
})

module.exports = router;