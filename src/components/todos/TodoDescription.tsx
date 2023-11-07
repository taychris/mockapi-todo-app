import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const TodoDescription = ({ description }: { description: string }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          className="block max-w-[120px] sm:max-w-[160px] md:max-w-xs px-0 py-0 text-sm font-light text-left truncate h-max"
        >
          {description}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-xs">
        <h1>Description</h1>
        <p className="text-sm font-light">{description}</p>
      </PopoverContent>
    </Popover>
  );
};
export default TodoDescription;
