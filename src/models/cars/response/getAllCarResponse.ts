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
    model: modelModels;
    color: colorModel;
    imagePath: string;
    transmissionType: string;
    fuelType: string;
    category: string;
    passengerCapacity: number;
    location: locationModels;
}