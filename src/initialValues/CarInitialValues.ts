import { AddCarRequest } from "../models/cars/request/addCarRequest";
import { UpdateCarRequest } from "../models/cars/request/updateCarRequest";

export const AddInitialValues: AddCarRequest = {
    id: 0,
    modelYear: 0,
    plate: '',
    minFindeksRate: 0,
    kilometer: 0,
    dailyPrice: 0,
    modelId: 0,
    colorId: 0,
    fuelType: "Yakıt Tipi Giriniz",
    transmissionType: "Vites Tipi Seçiniz",
    category: "Kategory Seçiniz",
    passengerCapacity: 0,
    imagePath: '',
    locationId: 0,
    discount: 0
};

export const UpdateInitialValues: UpdateCarRequest = {
    id: 0,
    modelYear: 0,
    plate: '',
    minFindeksRate: 0,
    kilometer: 0,
    dailyPrice: 0,
    transmissionType: '',
    fuelType: '',
    category: '',
    passengerCapacity: 0,
    imagePath: '',
    discount: 0
};
