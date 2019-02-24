var express          = require('express');
var router           = express.Router();
var models           = require('../models');
var albumController  = require('../controllers/album.controller');
const handleError    = require('../util/handle-error.util');

router.get('/all',(req,res)=>{
    models.album.findAll()
        .then((albums)=>{
            res.send(albums);
        })
        .catch((err)=>res.status(500).send());
});

router.get('/stickers/:idAlbum', (req, res)=>{
    var idAlbum = req.params.idAlbum;

    albumController.getAlbum(idAlbum)
    .then((album)=>{
        return models.sticker.findAll({
            where: {
                albumIdAlbum: idAlbum
            }
        })
    })
    .then((stickers)=>{
        var result = [];
        stickers.forEach(element => {
            result.push(element['numberSticker'])
        });
        res.send(result);
    })
    .catch((err)=> handleError(err, res));
});


module.exports = router;