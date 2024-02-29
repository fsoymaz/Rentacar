// authService.ts
import axios from 'axios';

import axiosInstance from '../../utils/Interceptors';
import { addLogin } from '../../models/auth/addLogin';
import { addRegister } from '../../models/auth/addRegister';

const API_BASE_URL = 'http://localhost:8080/api';
//const API_BASE_URL = 'https://rent-a-car-project.azurewebsites.net/api';

const authService = {
  login: async (credentials: addLogin): Promise<any> => {


       return await axiosInstance.post<any>(`${API_BASE_URL}/auths/login`, credentials);
  },

  register: async (register: addRegister): Promise<any> =>
  {
    return await axiosInstance.post<any>(`${API_BASE_URL}/auths/registerCustomer`, register)
  }
};

export default authService;
