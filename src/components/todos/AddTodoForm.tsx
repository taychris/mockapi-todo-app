import {
  TodoItemValidationSchema,
  todoItemValidationSchema,
} from "@/lib/validations/todo";
import { addTodoItem } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorInfo } from "@/components/ui/error-info";
import { useToast } from "@/components/ui/use-toast";

interface AddTodoFormProps extends TodoListProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTodoForm = ({ todoList, setIsOpen }: AddTodoFormProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoItemValidationSchema>({
    resolver: zodResolver(todoItemValidationSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (todo: TodoItemValidationSchema) => addTodoItem(todo, todoList),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      reset();
      setIsOpen(false);
      toast({
        title: "Todo added. 😎",
        description: "Mark your todo as done, once you're finished with it.",
      });
    },
    onError: () => {
      toast({
        title: "Failed to add todo. 👀",
        description: "Something went wrong on our end. Try again later.",
      });
    },
  });

  const saveTodoItem: SubmitHandler<TodoItemValidationSchema> = (data) => {
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(saveTodoItem)}
      className="flex flex-col gap-4 text-left"
    >
      <div>
        <Label htmlFor="title">Title *</Label>
        <Input id="title" type="text" {...register("title")} />
        {errors.title && <ErrorInfo message={errors.title.message} />}
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input id="description" type="text" {...register("description")} />
      </div>
      <div>
        <Label htmlFor="deadLine">Deadline</Label>
        <Input id="deadLine" type="datetime-local" {...register("deadLine")} />
        {errors.deadLine && <ErrorInfo message={errors.deadLine.message} />}
      </div>
      <Button type="submit" disabled={isPending}>
        Save
      </Button>
    </form>
  );
};

export default AddTodoForm;
