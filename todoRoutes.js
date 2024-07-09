const express = require('express');
const router = express.Router();
const pool = require('./db');
const auth = require('./authMiddleware');

// Get all todos for a user
router.get('/', auth, async (req, res) => {
  try {
    const todos = await pool.query('SELECT * FROM todos WHERE user_id = $1 ORDER BY id', [req.user.id]);
    res.json(todos.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new todo
router.post('/', auth, async (req, res) => {
  try {
    const { text } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todos (user_id, text) VALUES ($1, $2) RETURNING *',
      [req.user.id, text]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle todo completion status
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query('SELECT * FROM todos WHERE id = $1 AND user_id = $2', [id, req.user.id]);
    if (todo.rows.length === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    const updatedTodo = await pool.query(
      'UPDATE todos SET completed = NOT completed WHERE id = $1 RETURNING *',
      [id]
    );
    res.json(updatedTodo.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a todo
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await pool.query('DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING *', [id, req.user.id]);
    if (deletedTodo.rows.length === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
