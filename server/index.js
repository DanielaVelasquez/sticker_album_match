const express            = require('express');
var app                  = express();
var bodyParser           = require('body-parser');
var models               = require('./models');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: 1048576}));

//Sync with models
models.sequelize.sync();

//Start the server
var port = process.env.PORT || 1337;
app.listen(port);


module.exports = app;