import axios from "axios";

const axiosInstance = axios.create({
        headers: {
            'Content-Type': 'application/json',
        }
    }
);

axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        handleServerError(error);
        return Promise.reject(error);
    }
);
const handleServerError = (error) => {
    if (error.response) {
        // server response error
        const {data, status} = error?.response;
        console.error("Request failed with status code:", status);
        console.error("Response data:", data);
    } else if (error.request) {
        // request made but no response received
        console.error("No response received for the request:", error.request);
    } else {
        // Something else happened with request
        console.error("Error happened with request:", error.message);
    }
    error.message = "خطا در برقراری ارتباط ";
    return error;
}

export {axiosInstance};
