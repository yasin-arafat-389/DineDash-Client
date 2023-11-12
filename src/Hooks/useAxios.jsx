import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://dine-dash-server.vercel.app",
  withCredentials: true,
});

const useAxios = () => {
  return axiosSecure;
};

export default useAxios;
