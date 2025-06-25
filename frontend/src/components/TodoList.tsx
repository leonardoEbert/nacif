import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../types';

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: number) => void;
  onToggleDone: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDelete, onToggleDone }) => {
  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map(todo => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            onDelete={onDelete} 
            onToggle={onToggleDone} 
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;