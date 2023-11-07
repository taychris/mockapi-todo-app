import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneTodoList } from "@/services/api";
import Todos from "@/components/todos/Todos";
import MyTodosSkeleton from "@/components/loading/MyTodosSkeleton";
import AddTodoDialog from "@/components/todos/AddTodoDialog";
import IsFinishedFilter from "@/components/todos/IsFinishedFilter";
import SearchFilter from "@/components/todos/SearchFilter";

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
