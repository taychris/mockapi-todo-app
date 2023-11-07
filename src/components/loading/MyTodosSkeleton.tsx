import { Skeleton } from "@/components/ui/skeleton";

const MyTodosSkeleton = () => {
  const skeletonList = Array(3).fill(null);

  return (
    <div className="flex flex-col items-center w-full h-screen gap-4 px-6 pt-20 pb-10 md:px-10">
        <Skeleton className="max-w-[250px] w-full h-14 mx-6" />
        <div className="flex flex-col w-full max-w-xs gap-2 md:flex-row md:max-w-md">
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-full md:w-[150px] h-8" />
        </div>
        
        <ul className="w-full max-w-xs p-4 space-y-4 border rounded-lg md:max-w-md bg-gray-50">
            {skeletonList.map((_, index) => (
                <li key={index} className="flex gap-4">
                    <Skeleton className="w-7 h-7 aspect-square"/>
                    <Skeleton className="flex-grow w-full h-7"/>
                    <Skeleton className="w-7 h-7 aspect-square"/>
                </li>
            ))}
        </ul>    
    </div>
  )
}
export default MyTodosSkeleton