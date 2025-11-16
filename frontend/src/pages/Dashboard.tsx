import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useTodos } from '../hooks/useTodos';
import { TodoForm } from '../components/TodoForm';
import { TodoItem } from '../components/TodoItem';
import { TodoInput } from '../schemas/todo.schema';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { todos, isLoading, createTodo, updateTodo, deleteTodo, toggleTodo, isCreating } = useTodos();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCreateTodo = (data: TodoInput) => {
    createTodo(data);
  };

  const handleUpdateTodo = (id: string, data: { title: string; description?: string }) => {
    updateTodo({ id, data });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Todo App</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <TodoForm onSubmit={handleCreateTodo} isLoading={isCreating} />

        {isLoading ? (
          <div className="text-center py-8">Loading todos...</div>
        ) : todos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No todos yet. Create your first one!</div>
        ) : (
          <div>
            {todos.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onUpdate={handleUpdateTodo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
