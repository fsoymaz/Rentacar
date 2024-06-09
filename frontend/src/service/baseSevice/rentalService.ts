import axiosInstance from "../../utils/Interceptors";
import { AxiosResponse } from "axios";
import { BaseService } from "./baseService";

class RentalService extends BaseService<
	any,
	any,
	any,
	any,
	any,
	any
	> {

	constructor() {
		super();
		this.apiUrl = "rentals";
	 }

	async createRental(userId: number, rentalData: any): Promise<AxiosResponse<any>> {
		try {
			const response = await axiosInstance.post("/rentals", {
				userId,
				...rentalData,
				carId: rentalData.carId,
			});
			return response;
		} catch (error) {
			throw new Error('Kiralama Oluşturulamadı. Lütfen tekrar deneyiniz.');
		}
	}

	getRentalUser(email: string): Promise<AxiosResponse<any, any>> {
		return axiosInstance.get<any>(this.apiUrl +`/getAllRental?email=${email}`);
	}

	getDailyRentals(date: string): Promise<AxiosResponse<any, any>> {
		return axiosInstance.get<any>(this.apiUrl + `/daily?date=${date}`);
	}

	getMonthlyIncome(month: string, year: string): Promise<AxiosResponse<any, any>> {
        return axiosInstance.get<any>(this.apiUrl + `/incomeMonthly?month=${month}&year=${year}`);
    }
	getYearlyIncome(year: number): Promise<AxiosResponse<any, any>>
	{
        return axiosInstance.get<any>(this.apiUrl + `/incomeYearly?year=${year}`);
	}
	
}

export default new RentalService();
