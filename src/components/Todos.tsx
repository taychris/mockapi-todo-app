import { removeTodoItem, toggleTodoItem } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ClockIcon, Trash2Icon } from "lucide-react";
import { updateTodoItemStatus } from "@/lib/utils";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, parseISO } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

interface TodosProps {
  todoList: TodoList;
}

interface RemoveTodoProps extends TodosProps {
  id: string;
}

interface ToggleTodoProps extends RemoveTodoProps {
  isFinished: boolean;
}

const Todos = ({ todoList }: TodosProps) => {
  return (
    <ul className="w-full max-w-xs p-4 space-y-4 border rounded-lg md:max-w-md bg-gray-50">
      {todoList?.todos.map((todo) => (
        <li key={todo.id} className={"flex gap-4"}>
          <ToggleTodo
            todoList={todoList}
            id={todo.id}
            isFinished={todo.isFinished}
          />
          <div className="flex-grow">
            <h1 className={`${todo.isFinished && "line-through"} leading-none`}>
              {todo.title}
            </h1>
            {todo.deadLine && (
              <div className="flex items-center gap-1 opacity-60">
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

const TodoDescription = ({ description }: { description: string }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          className="block max-w-[120px] sm:max-w-[160px] md:max-w-xs px-0 py-0 text-sm font-light text-left truncate h-max"
        >
          {description}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-xs">
        <h1>Description</h1>
        <p className="text-sm font-light">{description}</p>
      </PopoverContent>
    </Popover>
  );
};

const ToggleTodo = ({ todoList, id, isFinished }: ToggleTodoProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (isFinished: boolean) =>
      toggleTodoItem(todoList, id, isFinished),
    onSuccess: async () => {
      const { todos } = await updateTodoItemStatus(todoList, id, isFinished);

      queryClient.setQueryData(["todos"], { ...todoList, todos });
    },
    onSettled: (res) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      if (res?.todos) {
        const udpatedTodo = res.todos.find((todo) => todo.id === id);
        toast({
          title: udpatedTodo?.isFinished
            ? "Todo marked as finished. ✅"
            : "Todo marked as ongoing. 🫡",
          description: "You're doing great. Keep it up.",
        });
      }
    },
    onError: () => {
      toast({
        title: "Failed to finish todo. 😥",
        description: "Something went wrong on our end. Try again later.",
      });
    },
  });

  const triggerFinishedMutation = (isFinished: boolean) => {
    mutate(isFinished);
  };

  return (
    <Checkbox
      className="mt-0"
      defaultChecked={isFinished}
      onCheckedChange={triggerFinishedMutation}
      disabled={isPending}
    />
  );
};

const RemoveTodoItem = ({ todoList, id }: RemoveTodoProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => removeTodoItem(todoList, id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast({
        title: "Todo removed. 🗑️",
      });
    },
    onError: () => {
      toast({
        title: "Failed to remove todo. 😥",
        description: "Something went wrong on our end. Try again later.",
      });
    },
  });

  const triggerDeleteMutation = () => {
    mutate();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"} className="p-2 aspect-square h-max w-max">
          <Trash2Icon className="w-3 h-3" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Do you want to remove this todo item?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your todo
            item and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={triggerDeleteMutation}
            disabled={isPending}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
