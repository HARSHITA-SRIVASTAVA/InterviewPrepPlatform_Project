import axios from "axios";

const API=axios.create({
    baseURL:"http://localhost:5000/api",
});

//if any error -> redirect to login (401 error )
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // If token invalid / expired
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized! Redirecting to login...");

      // Remove bad token
      localStorage.removeItem("token");

      // Redirect user
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);


export default API;