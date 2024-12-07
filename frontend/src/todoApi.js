// frontend/src/api.js
import axios from 'axios';

const API_URL = 'http://52.70.216.203:8000/todos/';  // Your backend URL

// Function to get all todos
export const getTodos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

// Function to create a new todo
export const createTodo = async (todo) => {
  try {
    const response = await axios.post(API_URL, todo);
    return response.data;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
};
