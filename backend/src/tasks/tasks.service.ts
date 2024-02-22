import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksService {
  private readonly tasks: Task[] = [];

  create(createTaskDto: CreateTaskDto) {
    let task: Task;
    task.id = uuidv4();
    const { propertyName, description, images } = createTaskDto;
    task.description = description;
    task.images = images;
    task.propertyName = propertyName;
    return this.tasks.push(task);
  }

  findAll(): Task[] {
    return this.tasks;
  }
}
