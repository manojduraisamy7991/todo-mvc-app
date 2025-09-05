const Todo = require('../models/Todo');

const createTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createTodo };
