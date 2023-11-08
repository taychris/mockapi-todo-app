import { ClockIcon } from "lucide-react";
import { format, parseISO } from "date-fns";
import TodoDescription from "@/components/todos/TodoDescription";
import ToggleTodoState from "@/components/todos/ToggleTodoState";
import RemoveTodoItem from "@/components/todos/RemoveTodoItem";

const Todos = ({ todoList }: TodoListProps) => {
  return (
    <ul className="w-full max-w-xs p-4 space-y-4 border rounded-lg md:max-w-md bg-gray-50">
      {todoList?.todos.map((todo) => (
        <li key={todo.id} className={"flex gap-4"}>
          <ToggleTodoState
            todoList={todoList}
            id={todo.id}
            isFinished={todo.isFinished}
          />
          <div className="flex-grow">
            <h1 className={`${todo.isFinished && "line-through"} leading-none`}>
              {todo.title}
            </h1>
            {todo.deadLine && (
              <div className="flex items-center gap-1 opacity-60" title="Deadline">
                <ClockIcon className="w-3" />
                <p className="text-xs font-light">
                  {format(parseISO(todo.deadLine.toString()), "dd MMM, yyyy")}
                </p>
              </div>
            )}
            {todo.description && (
              <TodoDescription description={todo.description} />
            )}
          </div>
          <RemoveTodoItem todoList={todoList} id={todo.id} />
        </li>
      ))}
    </ul>
  );
};

export default Todos;
