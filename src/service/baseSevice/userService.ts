import { AxiosResponse } from 'axios';
import { UserModel } from './../../models/userModels/userModel';
import { BaseService } from "./baseService";
import axiosInstance from '../../utils/Interceptors';

class UserService extends BaseService<
UserModel,
UserModel,
UserModel,
UserModel,
UserModel,
UserModel


>{
    constructor() {
        super();
        this.apiUrl = "users";
    }

    getCreditCardById(id: number): Promise<AxiosResponse<any, any>> {
		return axiosInstance.get<any>(this.apiUrl +`/getCreditCardById?id=${id}`);
	}

}

export default new UserService();