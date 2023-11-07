import { Skeleton } from "@/components/ui/skeleton";

const MyTodoListsSkeleton = () => {
  const skeletonList = Array(3).fill(null);

  return (
    <div className="w-full h-screen px-6 pt-20 pb-10 space-y-4 md:px-10">
      <Skeleton className="max-w-[350px] w-full h-14 mx-auto" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {skeletonList.map((_, index) => (
          <div className="flex gap-2" key={index}>
            <Skeleton className="min-w-[200px] w-full h-10" />
            <Skeleton className="w-10 h-10" />
          </div>
        ))}
      </div>
    </div>
  );
};
export default MyTodoListsSkeleton;
