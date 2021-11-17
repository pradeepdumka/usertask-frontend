import { Task } from './task.model';

export class User {
  constructor(public szUserName: string, public tasks: Task[]) {}
}
