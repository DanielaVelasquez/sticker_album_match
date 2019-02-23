var express                 = require('express');
var router                  = express.Router();
var models                  = require('../models');
var { isValidModel }        = require('../util/model.util');
var { userStickerFields }   = require('../util/model.validation');
const handleError           = require('../util/handle-error.util');


router.patch('/update/sticker',(req, res) => {
    const userSticker = req.body;

    if(!isValidModel(userSticker, userStickerFields))
        res.status(400).send({field: 1, error: 1});
    else
    {
        
    }
});

module.exports = router;