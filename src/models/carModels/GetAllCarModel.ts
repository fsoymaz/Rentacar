import { colorModel } from "../colorModels/getColorModel";
import { modelModels } from "../modelModels/GetAllModelsModel";

export interface modelLocation
{
    id: number;
    name: string;

}

export interface CarModel{
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
    location: modelLocation;

  }

  export interface PostCarModel{
    modelYear: number;
    plate: string;
    minFindeksRate?: number;
    kilometer: number;
    dailyPrice: number;
    modelId: number;
    colorId: number;
    imagePath: string;
    transmissionType: string;
    fuelType: string;
    category: string;
    passengerCapacity: number;
  }