import { updateTodoItemStatus } from "@/lib/utils";
import {
  TodoItemValidationSchema,
  TodoListValidationSchema,
} from "@/lib/validations/todo";
import axios from "axios";

export const addTodoList = async (todoList: TodoListValidationSchema) => {
  return axios.post(import.meta.env.VITE_API_URL, {
    title: todoList.title,
    todos: [],
  });
};

export const addTodoItem = async (
  todo: TodoItemValidationSchema,
  todoList: TodoList
) => {
  const { id, todos } = todoList;

  const { data } = await axios.put<TodoList>(`${import.meta.env.VITE_API_URL}/${id}`, {
    todos: [...todos, { ...todo, isFinished: false, id: crypto.randomUUID() }],
  });

  return data;
};

export const toggleTodoItem = async (
  todoList: TodoList,
  todoItemId: string,
  isFinished: boolean
) => {
  const { id, todos } = await updateTodoItemStatus(
    todoList,
    todoItemId,
    isFinished
  );

  const { data } = await axios.put<TodoList>(`${import.meta.env.VITE_API_URL}/${id}`, {
    todos,
  });

  return data;
};

export const removeTodoItem = async (
  todoList: TodoList,
  todoItemId: string
) => {
  const { id, todos } = todoList;

  return axios.put<TodoList>(`${import.meta.env.VITE_API_URL}/${id}`, {
    todos: todos.filter((todo) => todo.id !== todoItemId),
  });
};

export const getAllTodoLists = async () => {
  const { data } = await axios.get<TodoList[]>(import.meta.env.VITE_API_URL);
  return data;
};

export const getOneTodoList = async (id: string) => {
  const { data } = await axios.get<TodoList>(
    `${import.meta.env.VITE_API_URL}/${id}`
  );
  return data;
};

export const removeTodoList = async (id: string) => {
  return axios.delete(`${import.meta.env.VITE_API_URL}/${id}`);
};
