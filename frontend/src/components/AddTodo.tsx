import React, { useState } from 'react';

const AddTodo: React.FC<{ onAdd: (todo: string) => void }> = ({ onAdd }) => {
  const [todo, setTodo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo.trim()) {
      onAdd(todo);
      setTodo('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default AddTodo;