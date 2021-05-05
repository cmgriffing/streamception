import { useRouter } from "next/router";
import axios from "axios";
import { useMemo } from "react";

export default function useAxios(token) {
  const router = useRouter();
  return useMemo(() => {
    const axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    axiosInstance.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (error.response.status === 401) {
          router.push("/login");
        }
        return Promise.reject(error);
      }
    );

    return axiosInstance;
  }, [token]);
}
