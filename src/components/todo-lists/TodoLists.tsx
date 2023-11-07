import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import RemoveTodoList from "./RemoveTodoList";

interface TodoListsProps {
  todoItems: TodoList[];
}

const TodoLists = ({ todoItems }: TodoListsProps) => {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {todoItems?.map((todo) => (
        <li
          className="flex items-center justify-center gap-2 text-xl font-medium uppercase"
          key={todo.id}
        >
          <Button asChild variant={"outline"} className="bg-gray-50">
            <Link to={`/my-todos/${todo.id}`} className="flex-grow group">
              {todo.title}
              <span
                aria-hidden="true"
                className="pl-1 duration-300 group-hover:pl-2"
              >
                →
              </span>
            </Link>
          </Button>
          <RemoveTodoList id={todo.id} />
        </li>
      ))}
    </ul>
  );
};

export default TodoLists;
