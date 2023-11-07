import { useMemo } from "react";
import debounce from "lodash.debounce";
import { Input } from "@/components/ui/input";
import { filterTodos } from "@/lib/utils";

const SearchFilter = ({
  todoList,
  isFinishedFilter,
  setSearchQuery,
  setFilteredTodoList,
}: SearchFilterProps) => {
  const onSearchChange = useMemo(
    () =>
      debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value;
        setSearchQuery(searchValue);
        setFilteredTodoList(
          filterTodos(todoList, searchValue, isFinishedFilter)
        );
      }, 300),
    [todoList, isFinishedFilter]
  );

  return (
    <Input
      type="search"
      className="flex-grow"
      placeholder="Search by title"
      onChange={onSearchChange}
    />
  );
};

export default SearchFilter;
