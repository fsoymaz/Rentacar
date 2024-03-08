export interface AddCarRequest {
    modelYear: number;
    plate: string;
    minFindeksRate?: number;
    kilometer: number;
    dailyPrice: number;
    modelId: number;
    colorId: number;
    transmissionType: string;
    fuelType: string;
    category: string;
    passengerCapacity: number;
    locationId?: number;
    discount: number;
}