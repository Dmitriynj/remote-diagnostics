import { AxiosError } from "axios";
import { AppContext } from "./AppContext";

export const handleError = (error: AxiosError): AppContext["error"] => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    return {
      message: error.response.data.message,
    };
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
    return {
      message: "Reqeust error",
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
    return {
      message: error.message,
    };
  }
};
