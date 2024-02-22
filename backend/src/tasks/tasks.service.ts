import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksService {
  private readonly tasks: Task[] = [];

  create(createTaskDto: CreateTaskDto) {
    const task = new Task();
    task.id = uuidv4();
    const { propertyName, description, images, cleaningDate } = createTaskDto;
    task.description = description;
    task.images = images;
    task.propertyName = propertyName;
    task.cleaningDate = cleaningDate;
    return this.tasks.push(task);
  }

  findAll(): Task[] {
    return this.tasks;
  }
}
