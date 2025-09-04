function NewsDetailsSkeleton() {
  const myArray = [1, 2, 3, 4] as const;
  return (
    <div>
      <div className=" flex flex-col  space-y-4 w-[95%] max-w-3xl mx-auto">
        {myArray.map((item) => (
          <article
            key={item}
            className=" p-4 lg:p-6 bg-gray-100 border border-gray-300 rounded"
          >
            <div className="flex justify-between items-center ml-2 ">
              <div className="h-6 w-24 bg-gray-200"></div>
              <div className="flex flex-col gap-1">
                <div className="bg-gray-200 w-20 h-4"></div>
                <div className="flex flex-col text-[16px] ">
                  <span className="text-neutral-500 sr-only">Date posted</span>
                  <span className="text-yellow-700">
                    {new Date().toLocaleDateString("en-GB")}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col text-[16px]  mt-4 ml-2">
              <span className="text-neutral-500 ">Subject</span>
              <p className="h-4 w-[70%] bg-gray-300 animate-pulse"></p>
            </div>
            <div className=" mt-5 bg-gray-200 rounded animate-pulse p-2 min-h-15">
              <span className=" sr-only">body</span>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex items-center gap-4 flex-wrap">
              <p className="bg-yellow-200 h-8 w-23 rounded animate-pulse"></p>
              <p className="bg-red-200 h-8 w-23 rounded animate-pulse"></p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default NewsDetailsSkeleton;
