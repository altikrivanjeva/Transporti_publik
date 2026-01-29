import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5001",
});

// Add a request interceptor to attach the access token
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor to handle token expiration
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If error is 403 (Forbidden/Expired) and we haven't retried yet
        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem("refreshToken");

            if (refreshToken) {
                try {
                    const res = await axios.post("http://localhost:5001/auth/refresh", {
                        refreshToken,
                    });

                    const newAccessToken = res.data.accessToken;
                    localStorage.setItem("accessToken", newAccessToken);

                    // Update the original request with the new token
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return API(originalRequest);
                } catch (refreshError) {
                    // Refresh token expired or invalid, logout user
                    localStorage.clear();
                    window.location.href = "/login";
                    return Promise.reject(refreshError);
                }
            }
        }
        return Promise.reject(error);
    }
);

export default API;
