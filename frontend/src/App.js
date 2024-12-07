// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { getTodos, createTodo } from './todoApi'; // Importing the API functions

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '', completed: false });

  // Fetch todos when the component mounts
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  // Handle the creation of new todo
  const handleCreateTodo = async () => {
    try {
      const createdTodo = await createTodo(newTodo);
      setTodos([...todos, createdTodo]); // Add the newly created todo to the list
      setNewTodo({ title: '', description: '', completed: false }); // Reset input fields
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>

      <div>
        <input
          type="text"
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
        />
        <button onClick={handleCreateTodo}>Add Todo</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <strong>{todo.title}</strong>: {todo.description} (Completed: {todo.completed ? 'Yes' : 'No'})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
