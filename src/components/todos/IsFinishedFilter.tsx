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
  const changeSelectedFilter = (selectedFilterValue: string) => {
    setIsFinishedFilter(selectedFilterValue);
    setFilteredTodoList(
      filterTodos(todoList, searchQuery, selectedFilterValue)
    );
  };

  return (
    <Select onValueChange={changeSelectedFilter}>
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
