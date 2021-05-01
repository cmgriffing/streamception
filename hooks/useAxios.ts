import axios from "axios";

export default function useAxios(token) {
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
