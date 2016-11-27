const fs = require('fs');
const express = require("express");
const bodyparser = require("body-parser");
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const db = require('./db');
const path = require('path');
const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy;
const logger = require('morgan');
 
const prepareParams = require("./middleware/prepareParams");
const getFeasts = require('./handlers/getFeasts');
const getFeastFiltered = require('./handlers/getFeastFiltered');
const getFeastFilteredCoord = require('./handlers/getFeastFilteredCoord');
const getFeastbyId = require('./handlers/getFeastbyId');


const thereIsDotEnv = fs.existsSync('.env')
if ( thereIsDotEnv ) require('dotenv').load()

const app = express();

app.set('view engine', 'pug')
app.use( express.static("public") )
app.use( bodyparser.urlencoded( { extended: false } ) )

app.use( cookieParser() );
app.use( session({ secret: 'supersecretworddonottelltoanyone'}) );
app.use( flash() );

app.use( prepareParams )
	
	// app.get('/', (req,res) => res.render('index') )
	app.get('/', getFeasts )
	app.get('/feasts', getFeasts )
	app.post('/feasts', getFeastFiltered )
	app.post('/feasts/coord', getFeastFilteredCoord )
	app.get('/feast/:id', getFeastbyId )


app.listen(3000, () => console.log("Listening on port 3000..."))