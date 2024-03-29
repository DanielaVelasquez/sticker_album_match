const express            = require('express');
var app                  = express();
var bodyParser           = require('body-parser');
var models               = require('./models');
var userRoutes           = require('./routes/user.route');
var albumRoutes          = require('./routes/album.route');
var userStickerRoutes    = require('./routes/user-sticker.route');
var seed                 = require('./seeds');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: 1048576}));
app.use((req, res, next) => {
	res.removeHeader("X-Powered-By");
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Length, Accept, Content-Type');
	if ('OPTIONS' === req.method) {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.send();
	}
	next();
});

//Assign routes
app.use('/user', userRoutes);
app.use('/album', albumRoutes);
app.use('/usersticker', userStickerRoutes);

//Sync with models
models.sequelize.sync({force: true}).then(()=>{
	//Fill the database with data
	seed.fill();
});


//Start the server
var port = process.env.PORT || 1337;
app.listen(port);


module.exports = app;