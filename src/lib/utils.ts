import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const updateTodoItemStatus = async (
  todoList: TodoList,
  todoItemId: string,
  isFinished: boolean
) => {
  const { id, todos } = todoList;

  const todoItemIndex = todos.findIndex((todo) => todo.id === todoItemId);
  todos[todoItemIndex].isFinished = isFinished;

  return { id, todos };
};

export const filterTodos = (
  todoList: TodoList,
  searchQuery: string,
  isFinishedFilter: string
) => {
  const filteredTodos = todoList.todos.filter((todo) => {
    if (isFinishedFilter === "finished" && !todo.isFinished) {
      return false;
    }
    if (isFinishedFilter === "ongoing" && todo.isFinished) {
      return false;
    }

    if (!todo.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    if (searchQuery && isFinishedFilter === "all") {
      return true;
    }

    return true;
  });

  return {
    ...todoList,
    todos: filteredTodos,
  };
};
