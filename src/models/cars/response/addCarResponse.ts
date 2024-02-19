import { colorModel } from "../../colorModels/getColorModel";
import { modelModels } from "../../modelModels/GetAllModelsModel";

export interface AddCarResponse {
    id: number;
    modelYear: number;
    plate: string;
    minFindeksRate: number;
    kilometer: number;
    dailyPrice: number;
    model: modelModels;
    color: colorModel;
    imagePath: string;
    transmissionType?: string;
    fuelType: string;
    category: string;
    passengerCapacity: number;
    modelId?: number;
    colorId?: number;
    locationId?: number;

}
