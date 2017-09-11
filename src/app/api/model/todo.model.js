'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema

module.exports = mongoose.model('Todo', {
    name: {
        type: String,
        required: 'Enter the name of the task'
    },
    description: String,
    dueDate: Date,
    priority: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
    status: {
        type: [{
            type: String,
            enum: ['pending', 'ongoing', 'completed']
        }],
        default: ['pending']
    }
});