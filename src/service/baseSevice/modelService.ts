import { modelModels } from "../../models/modelModels/GetAllModelsModel";
import { BaseService } from "./baseService";


class ModelService extends BaseService<

modelModels,
modelModels,
modelModels,
modelModels,
modelModels,
modelModels
>{
    constructor() {
        super();
        this.apiUrl = "models";
    }
}

export default new ModelService();