import axios from "axios";
import jsSHA from "jssha";
import { setInterceptor } from "./interceptor";

function apiFactory(axiosInstance) {
    return {
        getAllSpots: (count, skipCount) => {
            return axiosInstance.get(`/MOTC/v2/Tourism/ScenicSpot?$top=${count}&$skip=${skipCount}&format=JSON`);
        },
        getCitySpots: (city, count, skipCount) => {
            return axiosInstance.get(`/MOTC/v2/Tourism/ScenicSpot/${city}?$top=${count}&$skip=${skipCount}&format=JSON`);
        }
    }
}

function getAuthorizationHeader() {
    let AppID = process.env.REACT_APP_APPID;
    let AppKey = process.env.REACT_APP_APPKEY;

    let GMTString = new Date().toUTCString();
    let ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    let HMAC = ShaObj.getHMAC('B64');
    let Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;

    return (AppID && AppKey) ? { 'Authorization': Authorization, 'X-Date': GMTString } : null;
}

const axiosConfig = {
    baseURL: 'https://ptx.transportdata.tw',
    headers: getAuthorizationHeader()
};

const axiosInstance = axios.create(axiosConfig);
setInterceptor(axiosInstance);

export const apiExecutor = apiFactory(axiosInstance);