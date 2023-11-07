interface TodoList {
  title: string;
  id: string;
  todos: TodoItem[];
}

interface TodoItem {
  title: string;
  isFinished: boolean;
  description?: string;
  deadLine?: Date;
  id: string;
}

interface TodoListProps {
  todoList: TodoList;
}

interface RemoveTodoProps extends TodoListProps {
  id: string;
}

interface ToggleTodoProps extends RemoveTodoProps {
  isFinished: boolean;
}

interface IsFinishedFilterProps extends TodoListProps {
  searchQuery: string;
  setFilteredTodoList: React.Dispatch<
    React.SetStateAction<TodoList | undefined>
  >;
  setIsFinishedFilter: React.Dispatch<React.SetStateAction<string>>;
}

interface SearchFilterProps
  extends Omit<IsFinishedFilterProps, "setIsFinishedFilter" | "searchQuery"> {
  isFinishedFilter: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}
