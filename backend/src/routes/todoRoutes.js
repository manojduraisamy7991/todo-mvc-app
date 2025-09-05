const express = require('express');
const router = express.Router();
const { createTodo } = require('../controllers/todoController');

router.post('/create', createTodo);

module.exports = router;
