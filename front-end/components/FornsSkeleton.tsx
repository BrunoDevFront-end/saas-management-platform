export default function FormsSkeleton() {
  return (
    <div className="animate-pulse space-y-1 w-full">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="flex h-24 items-center gap-28  border border-neutral-500 p-6"
        >
          <div className="flex-1 space-y-3">
            <div className="h-5 w-80 rounded bg-neutral-500" />
            <div className="h-4 w-96 rounded bg-neutral-500" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-24 rounded bg-neutral-500" />
            <div className="h-4 w-20 rounded bg-neutral-500" />
          </div>

          <div className="h-10 w-10 rounded-lg bg-neutral-500" />
          <div className="h-8 w-24 rounded-full bg-neutral-500" />
          <div className="h-4 w-20 rounded bg-neutral-500" />
        </div>
      ))}
    </div>
  );
}
