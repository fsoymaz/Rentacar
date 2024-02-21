import React, { useState } from 'react';
import CarTable from './CarTable';
import carService from '../../../../service/baseSevice/carService';
import AdminPageAplication from '../AdminPageAplication';
import AddCar from './AddCar';
import UpdateCar from './UpdateCar';
import '../Admin.css'; // Import CSS file

const Car = () => {
  const [cars, setCars] = useState<any>([]); // Değişken adı cars olarak değiştirildi
  return (
    <div className="Car">
      <AdminPageAplication service={carService} Table={CarTable} AddData={AddCar} UpdateData={UpdateCar} /> {/* Table props'u büyük harfle başladı */}
    </div>
  );
}
export default Car;