import Title from "@/components/adminComponents/Title";

function MessageDetailSkeleton() {
  return (
    <section className="w-[95%] max-w-3xl mx-auto py-8 relative">

      <div className=" bg-gray-300 p-6 lg:p-8 rounded">
        <div className="flex justify-between items-center">
          <div>
            <p className="h-3 w-12 bg-gray-200"></p>
            <p className="h-3 w-32 bg-gray-200 mt-2"></p>
          </div>
          <div>
            <p className="h-3 w-8 bg-gray-200"></p>
            <p className="h-3 w-14 bg-gray-200 mt-2"></p>
          </div>
        </div>
        <div className="mt-8">
          <p className="h-3 w-14 animate-pulse bg-gray-200"></p>
          <p className="h-3 w-28 animate-pulse bg-gray-200 mt-2"></p>
        </div>
        <div className="mt-4">
          <p className="h-3 w-12 animate-pulse bg-gray-200"></p>
          <p className="h-3 w-30 animate-pulse bg-gray-200 mt-2"></p>
        </div>
        <div className="mt-4">
          <p className="h-3 w-18 animate-pulse bg-gray-200"></p>
          <p className="h-3 w-15 animate-pulse bg-gray-200 mt-2"></p>
        </div>
        <div className="mt-4">
          <p className="h-3 w-18 animate-pulse bg-gray-200"></p>
          <p className="h-3 w-25 animate-pulse bg-gray-200 mt-2"></p>
        </div>
        <div className="mt-4">
          <p className="h-3 w-12 animate-pulse bg-gray-200"></p>
          <p className="h-24 w-full rounded animate-pulse bg-gray-200 mt-2"></p>
        </div>
        <div className="mt-4 flex gap-4">
          <p className="h-6 w-16 rounded animate-pulse bg-gray-200"></p>
          <p className="h-6 w-16 rounded animate-pulse bg-gray-200 "></p>
        </div>
      </div>
    </section>
  );
}

export default MessageDetailSkeleton;
