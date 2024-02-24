import { AxiosResponse } from "axios";
import { BrandModel } from "../../models/brandModels/GetAllBrandModel";
import { BaseService } from "./baseService";
import axiosInstance from "../../utils/Interceptors";

class BrandService extends BaseService<
    BrandModel,
    any,
    any,
    any,
    any,
    any
>{
    constructor() {
        super();
        this.apiUrl = "brands";
    }
  
    getBrandByName(name: string) : Promise<AxiosResponse<BrandModel, any>> {
		return axiosInstance.get<BrandModel>(`brands/${name}`);
	}
}

export default new BrandService();