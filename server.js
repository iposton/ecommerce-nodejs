var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ejsMate = require('ejs-mate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');

var secret = require('./config/secret');
var User = require('./models/user')

var app = express();

mongoose.connect(secret.database, function(err) {
	if (err) {
		console.log(err);
	} else {
		console.log('Connected to the data base');
	}
})


//Middleware
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: secret.secretKey
}));
app.use(flash());

var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');
app.use(mainRoutes);
app.use(userRoutes);

app.listen(secret.port, function(err) {
	if (err) throw err;
	console.log('Server is running on port ' + secret.port);
});