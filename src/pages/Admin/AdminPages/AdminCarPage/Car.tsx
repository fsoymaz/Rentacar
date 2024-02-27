import React, { useState } from 'react';
import CarTable from './CarTable';
import carService from '../../../../service/baseSevice/carService';
import AddCar from './AddCar';
import UpdateCar from './UpdateCar';
import '../Admin.css'; // Import CSS file
import DeleteCar from './DeleteCar';
import AdminPageApplication from '../AdminPageAplication';

const Car = () => {
  return (
    <div className="Car col-10">
      <AdminPageApplication service={carService} Table={CarTable} AddData={AddCar} UpdateData={UpdateCar} DeleteData={DeleteCar} />
    </div>
  );
}
export default Car;