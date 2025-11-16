import { useState } from 'react';
import { Todo } from '../schemas/todo.schema';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: { title: string; description?: string }) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');

  const handleSave = () => {
    onUpdate(todo._id, { title, description });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-lg shadow mb-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-2"
          placeholder="Title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-2"
          placeholder="Description"
          rows={2}
        />
        <div className="flex gap-2">
          <button onClick={handleSave} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-3 flex items-start gap-3">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo._id)}
        className="mt-1 w-5 h-5 cursor-pointer"
      />
      <div className="flex-1">
        <h3 className={`font-semibold ${todo.completed ? 'line-through text-gray-500' : ''}`}>
          {todo.title}
        </h3>
        {todo.description && (
          <p className={`text-sm text-gray-600 mt-1 ${todo.completed ? 'line-through' : ''}`}>
            {todo.description}
          </p>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(todo._id)}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
