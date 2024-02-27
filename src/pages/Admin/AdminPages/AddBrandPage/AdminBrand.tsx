import { useState } from "react";
import AdminPageApplication from "../AdminPageAplication";
import brandService from "../../../../service/baseSevice/brandService";
import BrandTable from "./BrandTable";
import AddBrand from "./AddBrand";
import DeleteCar from "../AdminCarPage/DeleteCar";
import BrandUpdate from "./BrandUpdate";
import DeleteBrand from "./DeleteBrand";

const AdminBrand = () => {
  const [brands, setBrands] = useState<any>([]); // Değişken adı cars olarak değiştirildi
  return (
    <div className="Brand col-10">
      <AdminPageApplication service={brandService} Table={BrandTable} AddData={AddBrand} UpdateData={BrandUpdate} DeleteData={DeleteBrand} />
    </div>
  );
}
export default AdminBrand;