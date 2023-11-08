
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddTodoListForm from "@/components/todo-lists/AddTodoListForm";

const AddTodoListDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          title="Add todo list"
        >
          Add todo list
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add your todo list</DialogTitle>
        </DialogHeader>
        <AddTodoListForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AddTodoListDialog;
