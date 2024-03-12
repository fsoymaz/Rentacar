import { PostlocationModels, locationModels } from "../../models/locations/locationModels";
import { BaseService } from "./baseService";

class LocationService extends BaseService<
	locationModels,
	locationModels,
	PostlocationModels,
	locationModels,
	locationModels,
	locationModels
>{
	constructor() {
		super();
		this.apiUrl = "locations";
	}
}
export default new LocationService();