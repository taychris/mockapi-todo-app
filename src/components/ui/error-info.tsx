export const ErrorInfo = ({ message }: { message: string | undefined }) => {
  return <p className="text-xs font-light">{message}</p>;
};
