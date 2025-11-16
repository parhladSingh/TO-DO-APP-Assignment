import { Router } from 'express';
import * as todoController from '../controllers/todo.controller';
import { validate, validateParams } from '../middleware/validate.middleware';
import { authenticate } from '../middleware/auth.middleware';
import { createTodoSchema, updateTodoSchema, todoIdSchema } from '../schemas/todo.schema';

const router = Router();

router.use(authenticate);

router.post('/', validate(createTodoSchema), todoController.createTodo);
router.get('/', todoController.getTodos);
router.get('/:id', validateParams(todoIdSchema), todoController.getTodoById);
router.put('/:id', validateParams(todoIdSchema), validate(updateTodoSchema), todoController.updateTodo);
router.delete('/:id', validateParams(todoIdSchema), todoController.deleteTodo);
router.patch('/:id/toggle', validateParams(todoIdSchema), todoController.toggleTodoComplete);

export default router;
