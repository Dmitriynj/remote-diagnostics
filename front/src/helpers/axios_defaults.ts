import axios from "axios";
import { Emitter } from "./Emitter";

export const initDefaults = () => {
  axios.defaults.baseURL = "http://localhost:8000";

  // Add a request interceptor
  axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      Emitter.emit("LOADING", true);
      return config;
    },
    function (error) {
      // Do something with request error
      Emitter.emit("LOADING", false);
      Emitter.emit("ERROR", error);
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      Emitter.emit("LOADING", false);
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      Emitter.emit("LOADING", false);
      Emitter.emit("ERROR", error);
      return Promise.reject(error);
    }
  );
};
