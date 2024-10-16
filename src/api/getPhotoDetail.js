import axios from "axios";
const key = import.meta.env.VITE_API_KEY;
export default async function fetchPhotoDetail(id) {
  const response = await axios.get(`https://api.unsplash.com/photos/${id}`, {
    params: {
      client_id: key,
    },
  });
  return response.data;
}

const data = await fetchPhotoDetail("JtwzKGec2vc");
console.log(data);
