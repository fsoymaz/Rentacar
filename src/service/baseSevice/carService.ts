import axios, { AxiosResponse } from "axios";
import { AddCarRequest } from "../../models/cars/request/addCarRequest";
import { UpdateCarRequest } from "../../models/cars/request/updateCarRequest";
import { AddCarResponse } from "../../models/cars/response/addCarResponse";
import { GetAllCarResponse } from "../../models/cars/response/getAllCarResponse";
import { GetByIdCarResponse } from "../../models/cars/response/getByIdCarResponse";
import { UpdateCarResponse } from "../../models/cars/response/updateCarResponse";

import { BaseService } from "./baseService";
import axiosInstance from "../../utils/Interceptors";

class CarService extends BaseService<
  GetAllCarResponse,
  GetByIdCarResponse,
  AddCarRequest,
  AddCarResponse,
  UpdateCarRequest,
  UpdateCarResponse
> {
  constructor() {
    super();
    this.apiUrl = "cars";

  }
  async getCarsByCategory(category: string): Promise<AxiosResponse<GetAllCarResponse[]>> {
    try {
      console.log('category:', category);
      const response = await axiosInstance.get<GetAllCarResponse[]>(`/cars/category?category=${category}`);
      return response;
    } catch (error) {
      console.error('An error occurred while fetching cars by category.', error);
      this.showAlert('An error occurred while fetching cars by category.');
      throw new Error('An error occurred while fetching cars by category.');
    }
  }
  
  async getAvailableCarsByCategory(startDate: string, endDate: string, locationId: number, category: string, brandId: string, modelId: string, minPrice: number | null, maxPrice: number | null) {
    const response = await axiosInstance.get('/cars/availableByCategory', {
      params: {
        startDate,
        endDate,
        locationId,
        category,
        brandId,
        modelId,
        minPrice,
        maxPrice,
      },
    });
    return response.data;
  }

  async getAvailableCars(startDate: string, endDate: string, locationId: number): Promise<AxiosResponse<GetAllCarResponse[]>> {
    try {
      console.log(locationId, startDate, endDate);
      const response = await axiosInstance.get(`/cars/available?startDate=${startDate}&endDate=${endDate}&locationId=${locationId}`);
      return response;
    } catch (error) {
      throw new Error('getavailablecars api\'sine ulaşamadı');
    }
  }
  // Yardımcı bir fonksiyon, alert gösterimi için
  private showAlert(message: string): void {
    alert(`Error: ${message}`);
  }

  async getByPlate(plate: string): Promise<AxiosResponse<any>> {
    const response =  axiosInstance.get(`/cars/${plate}`);
    console.log(response);
    return response;
}

}

export default new CarService();