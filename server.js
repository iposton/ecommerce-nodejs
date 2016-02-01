var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ejsMate = require('ejs-mate');

var User = require('./models/user')

var app = express();

mongoose.connect(process.env.MONGOLAB_URI, function(err) {
	if (err) {
		console.log(err);
	} else {
		console.log('Connected to the data base');
	}
})

PORT = 3000;

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

app.post('/create-user', function(req, res, next){
	var user = new User();

	user.profile.name = req.body.name;
	user.password = req.body.password;
	user.email = req.body.email;

	user.save(function(err) {
		if(err) return next(err);

		res.json('Sucessfully created a new user');
	});
});


app.listen(PORT, function(err) {
	if(err) throw err; 
	console.log('Server is running on port '+PORT);
});