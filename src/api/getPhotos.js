import axios from "axios";
export default async function fetchPhotos(pageParam) {
  console.log("Page param: ", pageParam);
  const response = await axios.get(`https://api.unsplash.com/photos`, {
    params: {
      client_id: "lRmCmDy73zMpwXoJ0TXvp7M1ZN7P1xyrxD4MlA4i71I",
      page: pageParam,
      per_page: 12,
    },
  });
  return response.data;
}
