import TodoLists from "@/components/todo-lists/TodoLists";
import MyTodoListsSkeleton from "@/components/loading/MyTodoListsSkeleton";
import AddTodoListDialog from "@/components/todo-lists/AddTodoListDialog";
import { getAllTodoLists } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

const MyTodoLists = () => {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["todoLists"],
    queryFn: getAllTodoLists,
  });

  if (isLoading) return <MyTodoListsSkeleton />;

  if (isError) return <p>{error.message}</p>;

  return (
    <>
      <Helmet>
        <title>My todos - Todo App</title>
      </Helmet>
      <div className="px-6 pb-10 pt-20 space-y-4 md:px-10 relative min-h-[100dvh] w-full">
        <h1 className="text-4xl font-bold tracking-tight text-center text-gray-900 sm:text-6xl">
          My todos
        </h1>
        <div className="fixed bottom-0 left-0 flex items-center justify-center w-full p-5">
          <AddTodoListDialog />
        </div>
        {data && data.length > 0 ? (
          <TodoLists todoItems={data} />
        ) : (
          <p className="font-light text-center">
            You have no todo lists yet. Create your first one by clicking add
            todo list button. 😉
          </p>
        )}
      </div>
    </>
  );
};

export default MyTodoLists;
