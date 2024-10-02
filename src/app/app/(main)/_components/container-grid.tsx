"use client";

import { Container } from "lucide-react";
import { useRouter } from "next/navigation";
import { Container as ContainerType } from "../types";

export default function ContainerGrid({
  containerList,
}: {
  containerList: ContainerType[];
}) {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/app/container/${id}`);
  };
  return (
    <div className="container mx-auto mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
        {containerList.map((container, i) => (
          <div
            onClick={() => handleClick(container.id)}
            key={i}
            className="bg-gray-100 dark:bg-gray-800/30 border-l-[10px] transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 cursor-pointer dark:border-blue-900 border-blue-600 rounded shadow-md p-4 flex flex-col justify-center items-center relative h-48"
          >
            <Container className="w-16 h-16" />
            <span className="absolute bottom-2 right-2 text-lg font-bold text-gray-700">
              #{i + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
