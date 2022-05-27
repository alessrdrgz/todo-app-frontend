export interface TodoItem {
  idTodo: number;
  name: string;
  description?: string;
  date: Date;
  tag?: string;
  completed: boolean;
}
