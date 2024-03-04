export interface AddCarRequest {
    id?: number;
    modelYear: number;
    plate: string;
    minFindeksRate?: number;
    kilometer: number;
    dailyPrice: number;
    modelId: number;
    colorId: number;
    imagePath?: string;
    transmissionType: string;
    fuelType: string;
    category: string;
    passengerCapacity: number;
    locationId?: number;
    discount: number;
}