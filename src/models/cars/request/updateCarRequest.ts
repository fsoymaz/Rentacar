export interface UpdateCarRequest {
    id: number;
    modelYear: number;
    plate: string;
    minFindeksRate?: number;
    kilometer: number;
    dailyPrice: number;
    imagePath?: string;
    transmissionType: string;
    fuelType: string;
    category: string;
    passengerCapacity: number;
    discount: number;
}