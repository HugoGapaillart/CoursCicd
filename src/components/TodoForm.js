import React, { useState } from 'react';

function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    addTodo(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        className="todo-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ajouter une tâche..."
      />
      <button type="submit" className="todo-button">Ajouter</button>
    </form>
  );
}

export default TodoForm;