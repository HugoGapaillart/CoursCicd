import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = text => {
    const newTodos = [...todos, {
      id: Math.random().toString(36).substr(2, 9),
      text,
      completed: false
    }];
    setTodos(newTodos);
  };

  const toggleComplete = id => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const removeTodo = id => {
    const filteredTodos = todos.filter(todo => todo.id !== id);
    setTodos(filteredTodos);
  };

  return (
    <div className="app">
      <h1>Ma Liste de Tâches</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList 
        todos={todos} 
        toggleComplete={toggleComplete} 
        removeTodo={removeTodo} 
      />
    </div>
  );
}

export default App;
