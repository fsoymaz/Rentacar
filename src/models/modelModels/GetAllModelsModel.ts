import { BrandModel } from "../brandModels/GetAllBrandModel";

export interface modelModels {
	id: number;
	name?: string;
	brand?: BrandModel;
}

export interface postModelModels {
	name: string;
	brandId: number;
}
