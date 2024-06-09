import { colorModel } from "../../models/colorModels/getColorModel";
import { BaseService } from "./baseService";

class ColorService extends BaseService<

   colorModel,
   colorModel,
   colorModel,
   colorModel,
   colorModel,
   colorModel
>{
    constructor() {
        super();
        this.apiUrl = "colors";
    }
}

export default new ColorService();