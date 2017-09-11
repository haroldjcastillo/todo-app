'use strict';

module.exports = function (app) {

    var TodoController = require('../controller/todo.controller');

    app.route('/task').get(TodoController.find).post(TodoController.create);

    app.route('/task/:id').get(TodoController.findOne).put(TodoController.update).delete(TodoController.remove);
};
//# sourceMappingURL=todo.route.js.map