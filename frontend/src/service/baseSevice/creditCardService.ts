import { AxiosResponse } from "axios";
import axiosInstance from "../../utils/Interceptors";
import { BaseService } from "./baseService";

class CreditCardService extends BaseService<any, any, any, any, any, any> {
    constructor() {
        super();
        this.apiUrl = "creditsCard";
    }

    ad(cardData: {
        cardNumber: string;
        validityDate: string;
        cardName: string;
        cardCvc: string;
    }, userId: number): Promise<AxiosResponse<any>> {
        return axiosInstance.post(`${this.apiUrl}`, cardData, {
            params: {
                userId
            }
        });
    }
}

export default new CreditCardService();
