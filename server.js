var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

const uuidv4 = require('uuid/v4');

var options = {
    user: 'todo',
    pass: 'todo',
    useMongoClient: true,
    server: {
        socketOptions: {
            socketTimeoutMS: 0,
            keepAlive: true
        },
        reconnectTries: 30
    }
}

mongoose.connect('mongodb://192.168.99.100:27017/tododb', options).then(
    () => { console.log('Connect') },
    err => { console.log('Connection error', err) }
);

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

var Todo = mongoose.model('Todo', {
    name: String,
    description: String,
    dueDate: Date,
    priority: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
    taskStatus: Number
});

app.post('/task/create', function (req, res) {
    console.log('Where', req.body);
    Todo.create({
        id: uuidv4(),
        name: req.body.name,
        description: req.body.description,
        //dueDate: req.body.duedate,
        priority: req.body.priority,
    }, function (err, todo) {
        if (err) {
            res.send(err);
            console.log(err);
        }
        Todo.find(function (err, todos) {
            console.log(todos);
            if (err) {
                res.send(err);
            }
            res.json(todos);
            console.log(todos);
        });
    });
});

app.get('/task', function (req, res) {
    Todo.find(function (err, todos) {
        if (err) {
            res.send(err);
        }
        res.json(todos);
        console.log(todos)
    });
});

app.delete('/task/destroy/:id', function (req, res) {
    Todo.remove({
        _id: req.params.id
    }, function (err, todo) {
        if (err) {
            res.send(err);
        }
        Todo.find(function (err, todos) {
            if (err) {
                res.send(err);
            }
            res.json(todos);
        });
    })
});

app.post('/task/update', function (req, res) {
    Todo.update(function (err, todos) {
        if (err) {
            res.send(err);
        }
        res.json(todos);
    });
});

app.listen(3000, function () {
    console.log('App listening on port 3000');
});