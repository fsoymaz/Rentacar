import { modelModels, postModelModels } from "../../models/modelModels/GetAllModelsModel";
import { BaseService } from "./baseService";


class ModelService extends BaseService<

modelModels,
modelModels,
postModelModels,
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