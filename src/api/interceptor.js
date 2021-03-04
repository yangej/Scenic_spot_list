export const setInterceptor = (axiosInstance) => {
    axiosInstance.interceptors.response.use((response) => {
        return response.status === 200 && response.data;
    });
};