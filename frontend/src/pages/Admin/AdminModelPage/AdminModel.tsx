import React, { useState } from 'react';
import AdminPageApplication from '../AdminPages/AdminPageAplication';
import modelService from '../../../service/baseSevice/modelService';
import ModelTable from '../../../components/Admin/Model/ModelTable';
import AddModel from '../AdminPages/AddModel';

const AdminModel = () => {
  return (
    <div className="Car col-10">
      <AdminPageApplication service={modelService} Table={ModelTable} AddData={AddModel} UpdateData={""} DeleteData={""} />
    </div>
  );
}
export default AdminModel;