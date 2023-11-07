import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { toggleTodoItem } from "@/services/api";
import { updateTodoItemStatus } from "@/lib/utils";

const ToggleTodoState = ({ todoList, id, isFinished }: ToggleTodoProps) => {
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
export default ToggleTodoState;
