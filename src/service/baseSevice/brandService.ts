import { BrandModel } from "../../models/brandModels/GetAllBrandModel";
import { BaseService } from "./baseService";

class BrandService extends BaseService<
    BrandModel,
    BrandModel,
    BrandModel,
    BrandModel,
    BrandModel,
    BrandModel
>{
    constructor() {
        super();
        this.apiUrl = "brands";
    }
}

export default new BrandService();