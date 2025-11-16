import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { todoSchema, TodoInput } from '../schemas/todo.schema';

interface TodoFormProps {
  onSubmit: (data: TodoInput) => void;
  isLoading?: boolean;
}

export const TodoForm = ({ onSubmit, isLoading }: TodoFormProps) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TodoInput>({
    resolver: zodResolver(todoSchema)
  });

  const handleFormSubmit = (data: TodoInput) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="mb-3">
        <input
          {...register('title')}
          type="text"
          placeholder="Todo title"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>
      <div className="mb-3">
        <textarea
          {...register('description')}
          placeholder="Description (optional)"
          rows={3}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {isLoading ? 'Adding...' : 'Add Todo'}
      </button>
    </form>
  );
};
