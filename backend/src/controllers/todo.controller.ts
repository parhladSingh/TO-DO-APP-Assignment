import { Response } from 'express';
import Todo from '../models/Todo';
import { AuthRequest } from '../middleware/auth.middleware';

export const createTodo = async (req: AuthRequest, res: Response): Promise<void> => {
    const { title, description } = req.body;
    const userId = req.userId;

    const todo = await Todo.create({
        title,
        description,
        userId
    });

    res.status(201).json({
        success: true,
        message: 'Todo created successfully',
        data: { todo }
    });
};

export const getTodos = async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.userId;
    const todos = await Todo.find({ userId }).sort({ createdAt: -1 });

    res.json({
        success: true,
        data: { todos }
    });
};

export const getTodoById = async (req: AuthRequest, res: Response): Promise<void> => {
    const { id } = req.params;
    const userId = req.userId;

    const todo = await Todo.findOne({ _id: id, userId });

    if (!todo) {
        res.status(404).json({ success: false, message: 'Todo not found' });
        return;
    }

    res.json({
        success: true,
        data: { todo }
    });
};

export const updateTodo = async (req: AuthRequest, res: Response): Promise<void> => {
    const { id } = req.params;
    const userId = req.userId;
    const updates = req.body;

    const todo = await Todo.findOneAndUpdate(
        { _id: id, userId },
        updates,
        { new: true, runValidators: true }
    );

    if (!todo) {
        res.status(404).json({ success: false, message: 'Todo not found' });
        return;
    }

    res.json({
        success: true,
        message: 'Todo updated successfully',
        data: { todo }
    });
};

export const deleteTodo = async (req: AuthRequest, res: Response): Promise<void> => {
    const { id } = req.params;
    const userId = req.userId;

    const todo = await Todo.findOneAndDelete({ _id: id, userId });

    if (!todo) {
        res.status(404).json({ success: false, message: 'Todo not found' });
        return;
    }

    res.json({
        success: true,
        message: 'Todo deleted successfully'
    });
};

export const toggleTodoComplete = async (req: AuthRequest, res: Response): Promise<void> => {
    const { id } = req.params;
    const userId = req.userId;

    const todo = await Todo.findOne({ _id: id, userId });

    if (!todo) {
        res.status(404).json({ success: false, message: 'Todo not found' });
        return;
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.json({
        success: true,
        message: 'Todo status updated',
        data: { todo }
    });
};
