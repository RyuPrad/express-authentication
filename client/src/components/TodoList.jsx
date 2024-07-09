import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/todos', {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setTodos(res.data);
    } catch (error) {
      console.error(error);
      if (error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/todos', { text: newTodo }, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setNewTodo('');
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTodo = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/todos/${id}`, {}, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/todos/${id}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Todo List</h2>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New todo"
          required
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
