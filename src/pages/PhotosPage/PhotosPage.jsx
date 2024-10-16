import React from "react";
import Heritage from "@/assets/Heritage.svg?react";
import Photo from "@/components/Photo/Photo.jsx";
import { useInfiniteQuery } from "@tanstack/react-query";
import fetchPhotos from "@/api/getPhotos.js";
import { useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function PhotosPage() {
  const navigate = useNavigate();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["photos"],
      queryFn: ({ pageParam }) => fetchPhotos(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 12 ? allPages.length + 1 : undefined;
      },
      staleTime: 60 * 1000,
      retry: false,
    });

  console.log(data);
  const observer = useRef();

  const lastPhotoRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  return (
    <div className="flex flex-col items-center min-h-[100vh]">
      <div className="mx-auto">
        <Heritage className="w-[100vw] h-[150px]" />
      </div>
      <div
        className="p-[24px] max-w-[1200px] rounded-[32px] glass-effect min-h-[500px] grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3
      gap-x-3 gap-y-3 justify-items-center items-center mx-auto"
      >
        {data?.pages.map((page, pageIndex) =>
          page.map((photo, photoIndex) => {
            if (
              pageIndex === data.pages.length - 1 &&
              photoIndex === page.length - 1
            ) {
              return (
                <div
                  key={photo.id}
                  ref={lastPhotoRef}
                  onClick={() => navigate(`/photos/${photo.id}`)}
                >
                  <Photo
                    src={photo?.urls?.thumb}
                    alt={photo?.alt_description}
                    user={photo?.user}
                  />
                </div>
              );
            }

            return (
              <div
                key={photo.id}
                onClick={() => navigate(`/photos/${photo.id}`)}
              >
                <Photo
                  src={photo?.urls?.thumb}
                  alt={photo?.alt_description}
                  user={photo?.user}
                />
              </div>
            );
          })
        )}

        {isFetchingNextPage && (
          <p className="w-full text-center">Loading more...</p>
        )}
      </div>
    </div>
  );
}
