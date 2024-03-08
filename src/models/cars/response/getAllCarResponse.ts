import { colorModel } from "../../colorModels/getColorModel";
import { locationModels } from "../../locations/locationModels";
import { modelModels } from "../../modelModels/GetAllModelsModel";

export interface GetAllCarResponse {
    id: number;
    modelYear: number;
    plate: string;
    minFindeksRate: number;
    kilometer: number;
    dailyPrice: number;
    modelName: string;
    brandName: string;
    colorName: string;
    imageUrl: string;
    transmissionType: string;
    fuelType: string;
    category: string;
    passengerCapacity: number;
    location: locationModels;
    
}