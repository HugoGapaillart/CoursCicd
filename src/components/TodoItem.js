import React from 'react';

function TodoItem({ todo, toggleComplete, removeTodo }) {
  return (
    <div className="todo-item">
      <div 
        className={`todo-text ${todo.completed ? "completed" : ""}`}
        onClick={() => toggleComplete(todo.id)}
      >
        {todo.text}
      </div>
      <button 
        className="delete-button"
        onClick={() => removeTodo(todo.id)}
      >
        Supprimer
      </button>
    </div>
  );
}

export default TodoItem;