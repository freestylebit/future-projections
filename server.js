"use strict";

const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');
const _ = require('lodash');
const winston = require('winston');

let app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
require('dotenv').config();


// Set view path and templating engine
app.set('views', __dirname + '/src/views');
app.set('view engine', 'ejs');

// Tap into physical directory for webpack assets
app.use(express.static(__dirname + '/dist'));

// Grabs all valid routes.
app.use('/', require('./src/routes.js')(db));

// Yields 404 if the user goes to non-existent path.
app.use((req, res, next) => {
  res.status(404).send('Page not found');
  next();
});


// Kickstart the server!
app.listen(3000, () => {
  winston.info('Go to http://localhost:3000!');
});
