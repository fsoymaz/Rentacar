import React, { useState } from 'react';
import CarTable from './CarTable';
import carService from '../../../../service/baseSevice/carService';
import AddCar from './AddCar';
import UpdateCar from './UpdateCar';
import '../Admin.css'; // Import CSS file
import DeleteCar from './DeleteCar';
import AdminPageApplication from '../AdminPageAplication';

const Car = () => {
  const [cars, setCars] = useState<any>([]); // Değişken adı cars olarak değiştirildi
  return (
    <div className="Car">
      <AdminPageApplication service={carService} Table={CarTable} AddData={AddCar} UpdateData={UpdateCar} DeleteData={DeleteCar} /> {/* Table props'u büyük harfle başladı */}
    </div>
  );
}
export default Car;