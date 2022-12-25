import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import TodosController from '@/controllers/todos.controller';

class TodosRouter implements Routes {
  public path = '/todos';
  public router = Router();
  public todosController = new TodosController()

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.todosController.getTodos)
    this.router.get(`${this.path}/:id`, this.todosController.getSingleTodo)
    this.router.post(`${this.path}`, this.todosController.createTodo)
    this.router.patch(`${this.path}/:id`, this.todosController.setTodoToCompleted)
    this.router.delete(`${this.path}/:id`, this.todosController.deleteTodo)
  }
}

export default TodosRouter;
