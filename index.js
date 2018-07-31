'use strict';

var express = require('express');
var kraken = require('kraken-js');
var keycloak = require('./keycloak');
var session = require('express-session');

var options, app;

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
options = {
    onconfig: function (config, next) {
        /*
         * Add any additional config setup or overrides here. `config` is an initialized
         * `confit` (https://github.com/krakenjs/confit/) configuration object.
         */
        next(null, config);
    }
};

app = module.exports = express();

app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: true,
    store: keycloak.memoryStore
}));

app.use(keycloak.keycloak.middleware());

app.use(kraken(options));

app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});