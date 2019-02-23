var express                 = require('express');
var router                  = express.Router();
var models                  = require('../models');
var isValidModel            = require('../util/model.util');
var userStickerFields       = require('../util/model.validation');
const handleError           = require('../util/handle-error.util');
var stickerStateController  = require('../controllers/sticker-state.controller');
var stickerController       = require('../controllers/sticker.controller');
var userStickerController   = require('../controllers/user-sticker.controller');
var userController          = require('../controllers/user.controller');

router.patch('/update/sticker',(req, res) => {
    const userSticker = req.body;

    if(!isValidModel(userSticker, userStickerFields))
        res.status(400).send({field: 1, error: 1});
    else
    {
        var stickerStatePromise = stickerStateController.getStickerState(userSticker.stickerState);
        var stickerPromise = stickerController.getSticker(userSticker.numberSticker, userSticker.idAlbum);
        var userPromise = userController.getuser(userSticker.userName);

        Promise.all([stickerPromise, stickerStatePromise, userPromise])
        .then(([sticker, stickerState, user])=>{
            if(sticker && stickerState && user)
            {
                return userStickerController.findOrCreateUserSticker(sticker,userSticker.userName);
            }
        })
        .then((userStickerFound)=>{
            return userStickerController.updateUserSticker(userStickerFound, userSticker.stickerState,user,stickerState,sticker);
        })
        .then(()=>res.send())
        .catch((err)=> handleError(err, res));
    }
});

module.exports = router;