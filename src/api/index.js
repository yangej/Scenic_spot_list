import axios from "axios";

function apiFactory(axiosInstance) {
    return {
        getAllSpots: (count, skipCount) => {
            return axiosInstance.get(`/MOTC/v2/Tourism/ScenicSpot?$top=${count}&$skip=${skipCount}&format=JSON`);
        },
        getCitySpots: (city, count, skipCount) => {
            return axiosInstance.get(`/MOTC/v2/Tourism/ScenicSpot/${city}?$top=${count}&skip=${skipCount}&format=JSON`);
        }
    }
}

const axiosConfig = {
    baseURL: 'https://ptx.transportdata.tw'
};
const axiosInstance = axios(axiosConfig);

export const apiExecutor = apiFactory(axiosInstance);