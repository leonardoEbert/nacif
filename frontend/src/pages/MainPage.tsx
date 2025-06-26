import React, { useEffect, useState } from 'react';

export interface Todo {
  id: number;
  title: string;
  description: string;
  done: boolean;
  inserted_at: string;
  updated_at: string;
}

const MainPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // Buscar todos
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/todos');
      const data = await res.json();
      console.log('Dados recebidos:', data);
      setTodos(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error('Erro ao buscar todos:', err);
      setTodos([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Criar novo todo
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    try {
      const res = await fetch('http://localhost:4000/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ todo: { title: newTitle, description: newDescription, done: false } }),
      });
      if (res.ok) {
        setNewTitle('');
        setNewDescription('');
        fetchTodos();
      }
    } catch (err) {
      console.error('Erro ao criar todo:', err);
    }
  };

  // Excluir todo
  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:4000/api/todos/${id}`, {
        method: 'DELETE',
      });
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      console.error('Erro ao deletar todo:', err);
    }
  };

  // Editar todo (title e description)
  const handleEdit = async (id: number, title: string, description: string) => {
    try {
      await fetch(`http://localhost:4000/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, title, description } : todo
      ));
    } catch (err) {
      console.error('Erro ao editar todo:', err);
    }
  };

  // Alternar done
  const handleToggleDone = async (id: number, done: boolean) => {
    try {
      await fetch(`http://localhost:4000/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: !done }),
      });
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, done: !done } : todo
      ));
    } catch (err) {
      console.error('Erro ao atualizar todo:', err);
    }
  };

  // Estado para edição inline
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const startEdit = (todo: Todo) => {
    setEditId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditTitle('');
    setEditDescription('');
  };

  const saveEdit = (id: number) => {
    handleEdit(id, editTitle, editDescription);
    cancelEdit();
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Todos</h2>
      <form onSubmit={handleCreate} className="mb-3">
        <div className="mb-2">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Título"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            required
          />
          <textarea
            className="form-control"
            placeholder="Descrição"
            value={newDescription}
            onChange={e => setNewDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success">Adicionar</button>
      </form>
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <ul className="list-group">
          {todos.map(todo => (
            <li
              key={todo.id}
              className={`list-group-item d-flex flex-column flex-md-row justify-content-between align-items-md-center ${todo.done ? 'list-group-item-success' : ''}`}
            >
              <div className="d-flex align-items-center mb-2 mb-md-0">
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  checked={todo.done}
                  onChange={() => handleToggleDone(todo.id, todo.done)}
                  title="Marcar como feito"
                />
                {editId === todo.id ? (
                  <div>
                    <input
                      type="text"
                      className="form-control mb-1"
                      value={editTitle}
                      onChange={e => setEditTitle(e.target.value)}
                    />
                    <textarea
                      className="form-control mb-1"
                      value={editDescription}
                      onChange={e => setEditDescription(e.target.value)}
                    />
                  </div>
                ) : (
                  <div>
                    <strong style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
                      {todo.title}
                    </strong>
                    <div style={{ fontSize: '0.9em', color: '#555' }}>
                      {todo.description}
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-2 text-muted" style={{ fontSize: '0.8em' }}>
                Criado em: {new Date(todo.inserted_at).toLocaleString()}<br />
                Atualizado em: {new Date(todo.updated_at).toLocaleString()}
              </div>
              <div className="d-flex gap-2">
                {editId === todo.id ? (
                  <>
                    <button className="btn btn-primary btn-sm" onClick={() => saveEdit(todo.id)}>Salvar</button>
                    <button className="btn btn-secondary btn-sm" onClick={cancelEdit}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-warning btn-sm" onClick={() => startEdit(todo)}>Editar</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(todo.id)}>Excluir</button>
                  </>
                )}
              </div>
              
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MainPage;