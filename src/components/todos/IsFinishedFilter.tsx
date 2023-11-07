import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filterTodos } from "@/lib/utils";

const IsFinishedFilter = ({
  searchQuery,
  todoList,
  setFilteredTodoList,
  setIsFinishedFilter,
}: IsFinishedFilterProps) => {
  return (
    <Select
      onValueChange={(e) => {
        setIsFinishedFilter(e);
        setFilteredTodoList(filterTodos(todoList, searchQuery, e));
      }}
    >
      <SelectTrigger className="w-full md:flex-grow-0 md:w-max whitespace-nowrap">
        <SelectValue placeholder="Filter by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={"all"}>All</SelectItem>
        <SelectItem value={"ongoing"}>Ongoing</SelectItem>
        <SelectItem value={"finished"}>Finished</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default IsFinishedFilter;
