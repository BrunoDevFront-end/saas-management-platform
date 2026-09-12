export default function StatLoading() {
  return (
    <div className="flex flex-col gap-1 m-5">
      <div className="mb-1 h-10 w-12 animate-pulse rounded-md bg-neutral-500" />
      <div className="h-4 w-20 animate-pulse rounded-md bg-neutral-500" />
      <div className="h-4 w-36 animate-pulse rounded-md bg-neutral-500" />
      <div className="h-4 w-48 animate-pulse rounded-md bg-neutral-500" />
    </div>
  );
}
