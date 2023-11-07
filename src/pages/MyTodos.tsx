import AddTodoForm from "@/components/AddTodoForm";
import Todos from "@/components/Todos";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { getOneTodoList } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { filterTodos } from "@/lib/utils";
import { useMemo } from "react";
import debounce from "lodash.debounce";
import MyTodosSkeleton from "@/components/loading/MyTodosSkeleton";
import { Helmet } from "react-helmet";

interface DialogProps {
  todoList: TodoList;
}

interface IsFinishedFilterProps extends DialogProps {
  searchQuery: string;
  setFilteredTodoList: React.Dispatch<
    React.SetStateAction<TodoList | undefined>
  >;
  setIsFinishedFilter: React.Dispatch<React.SetStateAction<string>>;
}

interface SearchFilterProps
  extends Omit<IsFinishedFilterProps, "setIsFinishedFilter" | "searchQuery"> {
  isFinishedFilter: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const MyTodos = () => {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFinishedFilter, setIsFinishedFilter] = useState("all");
  const [filteredTodoList, setFilteredTodoList] = useState<TodoList>();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["todos", id],
    queryFn: () => getOneTodoList(id!),
  });

  useEffect(() => {
    setFilteredTodoList(data);
  }, [data]);

  if (isLoading) return <MyTodosSkeleton />;

  if (isError) return <p>{error.message}</p>;
  
  return (
    <>
      <Helmet>
        <title>{data?.title || "My todo list"} - Todo App</title>
      </Helmet>
      {data && filteredTodoList ? (
        <div className="flex flex-col items-center w-full min-h-[100dvh] relative gap-4 px-6 pb-10 pt-20 md:px-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {filteredTodoList.title}
          </h1>

          <div className="fixed bottom-0 left-0 flex items-center justify-center w-full p-5">
            <AddTodoDialog todoList={data} />
          </div>
          <div className="flex flex-col w-full max-w-xs gap-2 md:flex-row md:max-w-md">
            {data.todos.length === 0 ? (
              <p className="font-light text-center">
                You have no todo items yet. Create your todo items by clicking
                the add todo button. 🤌
              </p>
            ) : (
              <>
                <SearchFilter
                  todoList={data}
                  setFilteredTodoList={setFilteredTodoList}
                  setSearchQuery={setSearchQuery}
                  isFinishedFilter={isFinishedFilter}
                />
                <IsFinishedFilter
                  searchQuery={searchQuery}
                  todoList={data}
                  setFilteredTodoList={setFilteredTodoList}
                  setIsFinishedFilter={setIsFinishedFilter}
                />
              </>
            )}
          </div>
          {filteredTodoList?.todos.length > 0 ? (
            <Todos todoList={filteredTodoList} />
          ) : (
            data.todos.length > 0 && (
              <p className="font-light text-center">
                Criteria does not match any todo items. 🤷‍♂️
              </p>
            )
          )}
        </div>
      ) : null}
    </>
  );
};

export default MyTodos;

const AddTodoDialog = ({ todoList }: DialogProps) => {
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
