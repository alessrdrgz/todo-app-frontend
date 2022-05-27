import axios from "axios";
import { TodoItem } from "../interfaces/TodoItem";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/";

export default class TodoApiRequests {
  static getTodos() {
    return axios.get(`${apiUrl}todo`).then((r) => {
      if (r.status === 200) return r.data;
      else return r.data.message;
    });
  }

  static getTodoById(id: number) {
    return axios.get(`${apiUrl}todo/${id}`).then((r) => {
      if (r.status === 200) return r.data;
      else return r.data.message;
    });
  }

  static deleteTodo(id: number) {
    return axios.delete(`${apiUrl}todo/${id}`).then((r) => {
      if (r.status === 200) return r.data;
      else return r.data.message;
    });
  }

  static search(todo: Partial<TodoItem>) {
    return axios.post(`${apiUrl}todos`, todo).then((r) => {
      if (r.status === 200) return r.data;
      else return r.data.message;
    });
  }

  static createTodo(todo: Partial<TodoItem>) {
    return axios.post(`${apiUrl}todo`, todo).then((r) => {
      if (r.status === 200) return r.data;
      else return r.data.message;
    });
  }

  static update(id: number, todo: Partial<TodoItem>) {
    return axios.patch(`${apiUrl}todo/${id}`, todo).then((r) => {
      if (r.status === 200) return r.data;
      else return r.data.message;
    });
  }
}
