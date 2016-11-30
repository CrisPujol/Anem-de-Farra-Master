const fs = require('fs');
const express = require("express");
const bodyparser = require("body-parser");
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const db = require('./db');
const path = require('path');
const passport = require('passport')
var http = require('http');

const LocalStrategy = require('passport-local').Strategy;
const logger = require('morgan');
 
const prepareParams = require("./middleware/prepareParams");
const getFeasts = require('./handlers/getFeasts');
const getFeastFiltered = require('./handlers/getFeastFiltered');
const getFeastFilteredCoord = require('./handlers/getFeastFilteredCoord');
const getFeastbyId = require('./handlers/getFeastbyId');
const createFeast = require('./handlers/createFeast');

const thereIsDotEnv = fs.existsSync('.env')
if ( thereIsDotEnv ) require('dotenv').load()

const PORT = process.env.PORT;

const app = express();


// passport config

app.set('view engine', 'pug')
app.use( express.static("public") )
app.use( bodyparser.urlencoded( { extended: false } ) )

app.use( logger('dev') );

app.use( cookieParser() );
app.use( session({ secret: 'supersecretworddonottelltoanyone'}) );
app.use( flash() );

app.use( passport.initialize() );
app.use( passport.session() );




//PASSPORT
const AUTH = process.env.AUTH || 'local';

	var Account = require('./models/account');
	passport.use( new LocalStrategy( Account.authenticate() ) );
	passport.serializeUser( Account.serializeUser() );
	passport.deserializeUser( Account.deserializeUser() );

	const routerAuthLocal = require('./routes/auth/local')
	app.use('/local', routerAuthLocal)


// GET AND FILTER FEASTS
app.use( prepareParams )
	
	app.get('/', getFeasts )
	app.get('/feasts', getFeasts )
	app.post('/feasts', getFeastFiltered )
	app.post('/feasts/coord', getFeastFilteredCoord )
	app.get('/feast/:id', getFeastbyId )
	app.get('/create', function(req, res){
		const user = req.user
		res.render("create", {user})
	})
	app.post('/create', createFeast )


app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))

module.exports = app;