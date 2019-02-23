var express          = require('express');
var router           = express.Router();
var models           = require('../models');
var { isValidModel } = require('../util/model.util');
var { userFields }   = require('../util/model.validation');

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

router.patch('/update/id/:id',(req,res)=>{
    const user = req.body;
    const id   = req.params.id;

    if(!isValidModel(user, userFields))
        res.status(400).send({field: 1, error: 1});
    else
    {
        models.user.findOne({
            where: {
                emailUser: email
            }
        })
    }

});


module.exports = router;