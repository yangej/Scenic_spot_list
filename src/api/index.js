import axios from "axios";
import { setInterceptor } from "./interceptor";

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

const axiosInstance = axios.create(axiosConfig);
setInterceptor(axiosInstance);

export const apiExecutor = apiFactory(axiosInstance);