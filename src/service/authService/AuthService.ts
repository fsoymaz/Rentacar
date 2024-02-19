// authService.ts
import axios from 'axios';

import axiosInstance from '../../utils/Interceptors';
import { addLogin } from '../../models/auth/addLogin';
import { addRegister } from '../../models/auth/addRegister';


const authService = {
  login: async (credentials: addLogin): Promise<any> => {


       return await axiosInstance.post<any>(`/auths/login`, credentials);
  },

  register: async (register: addRegister): Promise<any> =>
  {
    return await axiosInstance.post<any>(`/auths/registerCustomer`, register)
  }
};

export default authService;
