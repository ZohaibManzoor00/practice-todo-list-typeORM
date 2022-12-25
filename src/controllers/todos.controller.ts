import { NextFunction, Request, Response } from 'express';
import { CreateTodoDto } from '@/dtos/todos.dto';
import { Todo } from '@/interfaces/todos.interface';
import TodoService from '@/services/todo.service';
import { TodoEntity } from '@/entities/todos.entity';
import { isEmpty } from '@utils/util';
import { HttpException } from '@/exceptions/HttpException';

class TodosController {
  public todosService = new TodoService();
  public getTodos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const todoData: Todo[] = await this.todosService.getAllTodosFromDB();
      res.status(200).json({ data: todoData });
    } catch (error) {
      res.status(400).json({ message: 'Failed', error });
      next(error);
    }
  };

  public createTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const todoData: CreateTodoDto = req.body;
      await this.todosService.createTodoFromDB(todoData);
      res.status(201).json({ message: 'Successfully Created!' });
    } catch (error) {
      res.status(400).json({ message: 'Failed', error });
      next(error);
    }
  };

  public getSingleTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const todoID = Number(req.params.id);
      const findTodo: Todo = await this.todosService.findTodo(todoID);
      if (!findTodo) res.status(200).json({ message: `Todo with ID: ${todoID} DOES NOT EXIST!` });
      res.status(200).json({ data: findTodo });
    } catch (error) {
      res.status(400).json({ message: 'Failed', error });
      next(error);
    }
  };

  public setTodoToCompleted = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const todoID = Number(req.params.id);
      const findTodo: Todo = await this.todosService.findTodo(todoID);
      if (!findTodo) res.status(200).json({ message: `Todo with ID: ${todoID} DOES NOT EXIST!` });
      await this.todosService.setTodoToCompletedFromDB(findTodo)
      res.status(200).json({ message: 'Successfully set to TRUE' });
    } catch (error) {
      res.status(400).json({ message: 'Failed', error });
      next(error);
    }
  };

  public deleteTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const todoID = Number(req.params.id);
      const findTodo: Todo = await this.todosService.findTodo(todoID);
      if (!findTodo) res.status(200).json({ message: `Todo with ID: ${todoID} DOES NOT EXIST!` });
      await this.todosService.deleteTodoFromDB(todoID)
      res.status(200).json({ message: `Successfully deleted ID: ${todoID}` });
    } catch (error) {
      res.status(400).json({ message: 'Failed', error });
      next(error);
    }
  };
}

export default TodosController;
