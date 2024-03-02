import AdminPageApplication from "../AdminPageAplication";
import brandService from "../../../../service/baseSevice/brandService";
import BrandTable from "../../../../components/Admin/Brand/BrandTable";
import AddBrand from "../../../../components/Admin/Brand/AddBrand";
import BrandUpdate from "../../../../components/Admin/Brand/BrandUpdate";
import DeleteBrand from "../../../../components/Admin/Brand/DeleteBrand";

const AdminBrand = () => {
  return (
    <div className="Brand col-10">
      <AdminPageApplication service={brandService} Table={BrandTable} AddData={AddBrand} UpdateData={BrandUpdate} DeleteData={DeleteBrand} />
    </div>
  );
}
export default AdminBrand;