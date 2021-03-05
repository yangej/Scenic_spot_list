export const setInterceptor = (axiosInstance) => {
    axiosInstance.interceptors.response.use((response) => {
        return response.data;
    }, (error) => {
        return Promise.reject(error.message);
    });
};