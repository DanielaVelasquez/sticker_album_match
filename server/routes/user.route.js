var express          = require('express');
var router           = express.Router();
var models           = require('../models');
var { isValidModel } = require('../util/model.util');
var { userFields }   = require('../util/model.validation');
const handleError    = require('../util/handle-error.util');

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
                userName: user.userName
            }
        })
        .then((userFound)=>{
            //The user found is the same one they are trying to update
            if(userFound && userFound.idUser != id)
                return Promise.reject({field: 100, error: 102});
            
            return models.user.update(user,
                {
                    where: {
                        idUser: id
                    }
                });
        })
        .then(()=>{
            res.send();
        })
        .catch((err) => {  
            console.log(err)
            handleError(err, res);
        });
    }

});

router.post('/create',(req,res)=>{
    const user = req.body;
    
    if(!isValidModel(user, userFields))
        res.status(400).send({field: 1, error: 1});
    else
    {
        models.user.findOne({
            where: {
                userName: user.username
            }
        })
        .then((userFound)=>{
            //The user found is the same one they are trying to update
            if(userFound)
                return Promise.reject({field: 100, error: 102});
            return models.user.create(user);
        })
        .then(()=>{
            res.send();
        })
        .catch((err) => {  
            handleError(err, res);
        });
    }

});



module.exports = router;