import React from "react";
import { useParams } from "react-router-dom";
import fetchPhotoDetail from "../../api/getPhotoDetail";
import { useQuery } from "@tanstack/react-query";

export default function PhotoDetailPage() {
  const { id: photoId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["photoDetail", photoId],
    queryFn: () => fetchPhotoDetail(photoId),
    staleTime: 60 * 1000,
    retry: false,
  });

  console.log("Photo detail data: ", data);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching photo details</p>;
  }

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 p-[24px] gap-x-4 gap-y-2 min-h-[100vh]">
      <img
        src={data?.urls.regular || ""}
        alt={data?.alt_description || ""}
        className="border-gradient self-center"
      ></img>
      <div className="p-4 border-0 rounded-[16px] glass-effect flex flex-col gap-2">
        <h1>
          <strong className="text-[4rem] bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            {data?.alt_description || "No title available"}
          </strong>
        </h1>
        <p>
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-[600] leading-loose">
            Author:
          </span>{" "}
          {data?.user?.name || "No name available"}
        </p>
        <p>
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-[600] leading-loose">
            Description:
          </span>{" "}
          {data?.alt_description || "No description available"}
        </p>
      </div>
    </div>
  );
}
