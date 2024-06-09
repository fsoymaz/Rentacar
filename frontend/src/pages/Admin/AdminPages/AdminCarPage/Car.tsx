import React, { useState } from 'react';
import CarTable from '../../../../components/Admin/Car/CarTable';
import carService from '../../../../service/baseSevice/carService';
import AddCar from '../../../../components/Admin/Car/AddCar';
import UpdateCar from '../../../../components/Admin/Car/UpdateCar';
import DeleteCar from '../../../../components/Admin/Car/DeleteCar';
import AdminPageApplication from '../AdminPageAplication';

const Car = () => {
  return (
    <div className="Car col-10">
      <AdminPageApplication service={carService} Table={CarTable} AddData={AddCar} UpdateData={UpdateCar} DeleteData={DeleteCar} />
    </div>
  );
}
export default Car;