const Router = require('express').Router;
const routes = new Router();
const todos = require('./todos');

// TODOS
routes.get('/todos/:id', todos.query);
routes.post('/todos', todos.create);



module.exports = routes;
