const Router = require('express').Router;
const routes = new Router();
const todos = require('./todos');

// TODOS
routes.get('/todos', todos.queryAll);
routes.get('/todos/:id', todos.queryById);
routes.post('/todos', todos.create);

module.exports = routes;
