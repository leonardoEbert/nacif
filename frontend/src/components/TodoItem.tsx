import React from 'react';

interface TodoItemProps {
  todo: {
    id: number;
    title: string;
    description: string;
    done: boolean;
    inserted_at: Date;
    updated_at: Date;
  };
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onToggle }) => {
  return (
    <div>
      <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
        {todo.title}
      </span>
      <button onClick={() => onToggle(todo.id)}>
        {todo.done ? 'Undo' : 'Done'}
      </button>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
};

export default TodoItem;