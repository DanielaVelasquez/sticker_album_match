var express          = require('express');
var router           = express.Router();
var models           = require('../models');
var { isValidModel } = require('../util/model.util');

router.get('/exists/username/:username', (req, res) => {
    const username = req.params.username;
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

router.get('/exists/email/:email', (req, res) => {
    const email = req.params.email;
    models.user.findOne({
        where: {
            emailUser: email
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

router.patch('/update/id/:id',(req,res)=>{
    const user = req.body;
    const id   = req.params.id;


});


module.exports = router;