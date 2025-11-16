import api from '../lib/axios';
import { TodoInput, Todo } from '../schemas/todo.schema';

export const todoApi = {
  getTodos: async (): Promise<{ success: boolean; data: { todos: Todo[] } }> => {
    const response = await api.get('/todos');
    return response.data;
  },

  createTodo: async (data: TodoInput): Promise<{ success: boolean; data: { todo: Todo } }> => {
    const response = await api.post('/todos', data);
    return response.data;
  },

  updateTodo: async (id: string, data: Partial<TodoInput>): Promise<{ success: boolean; data: { todo: Todo } }> => {
    const response = await api.put(`/todos/${id}`, data);
    return response.data;
  },

  deleteTodo: async (id: string): Promise<{ success: boolean }> => {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  },

  toggleTodo: async (id: string): Promise<{ success: boolean; data: { todo: Todo } }> => {
    const response = await api.patch(`/todos/${id}/toggle`);
    return response.data;
  }
};
