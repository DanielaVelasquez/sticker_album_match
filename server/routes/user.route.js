var express      = require('express');
var router       = express.Router();
var models       = require('../models');

router.get('/exists/username/:username', (req, res) => {
    var username = req.params.username;
    models.user.findOne({
        where: {
            userName: username
        }
    })
    .then((user)=>{
        if(user)
            res.send({exists: true});
        else
            res.send({exists: false})
    })
    .catch((err)=>res.status(500).send());
});

router.post('/exitsEmail', (req, res) => {

});