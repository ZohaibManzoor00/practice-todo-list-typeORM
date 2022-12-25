import { TodoEntity } from '@/entities/todos.entity';
import { Todo } from '@/interfaces/todos.interface';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository()
class TodoService extends Repository<TodoEntity> {
  public async getAllTodosFromDB(): Promise<Todo[]> {
    const todos: Todo[] = await TodoEntity.find();
    return todos;
  }

  public async createTodoFromDB(todoData: object): Promise<Todo> {
    const created: Todo = await TodoEntity.create({ ...todoData }).save();
    return created;
  }

  public async findTodo(ID: number): Promise<Todo> {
    const findTodo: Todo = await TodoEntity.findOne({ where: { id: ID } });
    return findTodo;
  }

  public async setTodoToCompletedFromDB(todoData: any): Promise<Todo> {
    const { id } = todoData;
    await TodoEntity.update(id, { ...todoData, completed: true });
    return;
  }

  public async deleteTodoFromDB(todoID): Promise<Todo> {
    await TodoEntity.delete({ id: todoID });
    return;
  }
}

export default TodoService;
