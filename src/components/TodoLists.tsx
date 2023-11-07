import { Link } from "react-router-dom";
import { Trash2Icon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeTodoList } from "@/services/api";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  todoItems: TodoList[];
}

const TodoLists = ({ todoItems }: Props) => {
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
          <RemoveTodoListButton id={todo.id!} />
        </li>
      ))}
    </ul>
  );
};

export default TodoLists;

const RemoveTodoListButton = ({ id }: { id: string }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: removeTodoList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todoLists"] });
      toast({
        title: "Todo list removed. 🎉",
      });
    },
    onError: () => {
      toast({
        title: "Failed to remove todo list. 😳",
        description:
          "Something went wrong during the removal. Try again later.",
      });
    },
  });

  const deleteTodoList = () => {
    mutate(id);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"} title="Remove todo list">
          <Trash2Icon className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Do you want to remove this todo list?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your todo
            list along with your todo items and remove your data from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteTodoList} disabled={isPending}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
