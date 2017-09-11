'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var options = {
    user: 'todo',
    pass: 't0d0',
    useMongoClient: true
};

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/tododb', options).then(function () {
    console.log('Connect');
}, function (err) {
    console.log('Connection error', err);
});

app.use(express.static(__dirname + '/src'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

var TodoModel = require('./src/app/api/model/todo.model');
var routes = require('./src/app/api/routes/todo.route');
routes(app);

app.listen(3000, function () {
    console.log('App listening on port 3000');
});
//# sourceMappingURL=server.js.map