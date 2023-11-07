import {
  TodoListValidationSchema,
  todoListValidationSchema,
} from "@/lib/validations/todo";
import { addTodoList } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ErrorInfo } from "@/components/ui/error-info";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const AddTodoListForm = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoListValidationSchema>({
    resolver: zodResolver(todoListValidationSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: addTodoList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todoLists"] });
      setIsOpen(false);
      toast({
        title: "Todo list added. 🎉",
        description: "Next step, add todos to the list.",
      });
    },
    onError: () => {
      toast({
        title: "Failed to add todo list. 😳",
        description:
          "Something went wrong during the creation. Try again later.",
      });
    },
  });

  const saveTodoList: SubmitHandler<TodoListValidationSchema> = (data) => {
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(saveTodoList)}
      className="flex flex-col gap-4 text-left"
    >
      <div>
        <Label htmlFor="title">Title *</Label>
        <Input id="title" type="text" {...register("title")} />
        {errors.title && <ErrorInfo message={errors.title.message} />}
      </div>
      <Button type="submit" disabled={isPending}>
        Save
      </Button>
    </form>
  );
};
export default AddTodoListForm;
