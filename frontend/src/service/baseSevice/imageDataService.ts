import { BaseService } from "./baseService";

class ImageDataService extends BaseService<

   any,
   any,
   any,
   any,
   any,
   any
>{
    constructor() {
        super();
        this.apiUrl = "imagedata";
    }
}

export default new ImageDataService();