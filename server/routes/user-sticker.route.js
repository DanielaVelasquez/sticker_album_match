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

module.exports = router;