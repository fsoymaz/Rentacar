import AdminPageApplication from "../AdminPageAplication";
import brandService from "../../../../service/baseSevice/brandService";
import BrandTable from "../../../../components/Brand/BrandTable";
import AddBrand from "../../../../components/Brand/AddBrand";
import BrandUpdate from "../../../../components/Brand/BrandUpdate";
import DeleteBrand from "../../../../components/Brand/DeleteBrand";

const AdminBrand = () => {
  return (
    <div className="Brand col-10">
      <AdminPageApplication service={brandService} Table={BrandTable} AddData={AddBrand} UpdateData={BrandUpdate} DeleteData={DeleteBrand} />
    </div>
  );
}
export default AdminBrand;