var express          = require('express');
var router           = express.Router();
var models           = require('../models');

router.get('/all',(req,res)=>{
    models.album.findAll()
        .then((albums)=>{
            res.send({data: albums});
        })
        .catch((err)=>res.status(500).send());
});




module.exports = router;