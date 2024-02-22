import axios from "axios";
import { loadToken, storeToken } from "../store/user/storage";
import { logoutSuccess } from '../store/user/userSlice';

const axiosInstance = axios.create({
    //baseURL: "http://localhost:8080/api",
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
       
       if(error.response.status ===403){
         store.dispatch(logoutSuccess())
         window.location.reload();
       }
        return error;
    },
);

let authToken = loadToken();

export function setToken(token?: any) {
  authToken = token;
  storeToken(token);
}



export default axiosInstance;