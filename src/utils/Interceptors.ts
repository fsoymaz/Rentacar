import axios from "axios";
import { loadToken, storeToken } from "../store/user/storage";
import { logoutSuccess } from '../store/user/userSlice'; // import increaseRequestCount
import { toast } from "react-toastify";

const axiosInstance = axios.create({
    //baseURL: "https://rent-a-car-project.azurewebsites.net/api",
    baseURL: "https://rent-a-car-project.azurewebsites.net/api",
});


let store: any;

export const injectStore = (_store: any) => {
  store = _store;
};

axiosInstance.interceptors.request.use(config => {
    if (authToken) {
        config.headers["Authorization"] = `${authToken}`;
      }
    return config;
});

axiosInstance.interceptors.response.use(
  value => {
      console.log("Başarılı bir cevap alındı..");
      return value;
  },
  error => {
     if(error.response.status === 403){
       store.dispatch(logoutSuccess());
       // Oturum süresinin dolduğunu belirten bir mesaj göster
       toast.error("Oturum süresi dolmuş. Lütfen tekrar giriş yapın.");
     }
      return Promise.reject(error);
  },
);

let authToken = loadToken();

export function setToken(token?: any) {
  authToken = token;
  storeToken(token);
}

export default axiosInstance;
