const { OAuth2Client } = require('google-auth-library')

require('dotenv').config();

const express = require('express'),
 app = express(),
 path = require('path'),
 cors = require('cors'),
 nconf = require('./config'),
 methodOverride = require('method-override'),
 writeError = require('./helpers/response').writeError,
 routes = require('./routes');
 cookieParser = require('cookie-parser'),
 passport = require('passport'),
 client = new OAuth2Client(process.env.CLIENT_ID)
// Set port
app.set('port', nconf.get('PORT'))


// Enable Cors
app.use(cors());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
      'Access-Control-Allow-Methods',
      'GET,HEAD,OPTIONS,POST,PUT,DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    next();
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cookieParser());

//dummy request
app.get('/dummy', (req, res) => res.send('Response from server.js'))

// --------------------------------------------------------------------
// --- API ------------------------------------------------------------
// --------------------------------------------------------------------

//Authentication
app.use('/', routes.authUser);

//People
app.use('/people', routes.people);
/**
 *  GET - request ||| '/people' - path ||| getAll - function name
 * 
 * 
 * 
 */ 

//Country
app.use('/country', routes.country);
/**
 *  GET - request ||| '/people' - path ||| getAll - function name
 * 
 * 
 * 
 */ 

//Course
app.use('/course', routes.course);
/**
 *  GET - request ||| '/people' - path ||| getAll - function name
 * 
 * 
 * 
 */ 

//Interest
app.use('/interest', routes.interest);
/**
 *  GET - request ||| '/people' - path ||| getAll - function name
 * 
 * 
 * 
 */ 










// error handler
app.use(function (err, req, res, next) {
    if (err && err.status) {
      writeError(res, err);
    } else next(err);
  });

app.listen(app.get('port'), () => {
    console.log('Listening on Port ' + app.get('port'));
});