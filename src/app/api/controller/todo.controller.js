'use strict';

var mongoose = require('mongoose');
var uuidv4 = require('uuid/v4');
var TodoModel = mongoose.model('Todo')

exports.create = function(req, res) {
    TodoModel.create({
        id: uuidv4(),
        name: req.body.name,
        description: req.body.description,
        dueDate: req.body.duedate,
        priority: req.body.priority,
    }, function (err) {
        if (err) {
            res.send(err);
            console.log(err);
        }
        TodoModel.find(function (err, todos) {
            if (err) {
                res.send(err);
            }
            res.json(todos);
            console.log(todos)
        });
    });
};

exports.find = function(req, res) {
    TodoModel.find(function (err, todos) {
        if (err) {
            res.send(err);
        }
        res.json(todos);
        console.log(todos)
    });
};

exports.remove = function(req, res) {
    TodoModel.remove({
        _id: req.params.id
    }, function (err, todo) {
        if (err) {
            res.send(err);
        }
        find(req, res);
    });
};

exports.update = function(req, res) {
    TodoModel.findOneAndUpdate(
        {
            _id: req.params.taskId
        }, req.body, {new: true},
        function (err, task) {
            if (err)
                res.send(err);
        res.json(task);
    });
};

exports.findOne = function(req, res) {
    TodoModel.findById(req.params.taskId, function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

