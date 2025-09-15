import Image from "next/image";
import { useFetch } from "@/hooks/useFetch";
import { JobTypes } from "@/models/types";
import { ErrorFetching, NoData } from "@/admin-components/index";
import { JobCard } from "@/components/index";

export default async function JobsPage() {
  const fetchDetails = {
    endpoint: "/jobs/list-all-jobs?limit=10",
    method: "GET",
    title: "Jobs",
  };
  const data = await useFetch<JobTypes>(fetchDetails);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Image */}
      <section className="relative h-[40vh] w-full">
        <Image
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d" // office stock photo
          alt="Modern Office"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            Careers & Opportunities
          </h1>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="container mx-auto py-12 px-4">
        <section className="mt-12 ">
          {!data?.success || !data ? (
            <ErrorFetching message={"Jobs"} />
          ) : data?.data.length === 0 && data.message ? (
            <NoData message={data.message} />
          ) : (
            <div className="flex flex-col gap-2 lg:gap-4 w-[95%] max-w-3xl mx-auto">
              {data?.data.map((item) => (
                <JobCard key={item.id} job={item} />
              ))}
            </div>
          )}
        </section>
      </section>
    </div>
  );
}
