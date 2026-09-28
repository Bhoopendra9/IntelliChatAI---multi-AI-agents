import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// // Add a request interceptor to include the sessionId cookie in requests
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// // Add a response interceptor to handle errors
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {

//     if (error.response?.status === 401) {
//       console.log("Unauthorized");
//     }

//     return Promise.reject(error);
//   }
// );

export default api;
