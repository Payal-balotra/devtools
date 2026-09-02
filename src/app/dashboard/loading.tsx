export default function Loading() {
  return (
    <div className="min-h-screen p-10">
      <div className="animate-pulse">
        <div className="h-8 w-64 rounded bg-gray-200" />
        <div className="mt-2 h-5 w-40 rounded bg-gray-200" />

        <div className="mt-10 h-7 w-40 rounded bg-gray-200" />

        <div className="mt-5 space-y-4">
          <div className="h-24 rounded-lg bg-gray-200" />
          <div className="h-24 rounded-lg bg-gray-200" />
          <div className="h-24 rounded-lg bg-gray-200" />
        </div>
      </div>
    </div>
  );
}