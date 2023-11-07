import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddTodoForm from "@/components/todos/AddTodoForm";

const AddTodoDialog = ({ todoList }: TodoListProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button title="Add todo" className="w-1/2 md:w-max">
          Add todo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add your todo</DialogTitle>
        </DialogHeader>
        <AddTodoForm todoList={todoList} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AddTodoDialog;
