import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import carService from '../../../service/baseSevice/carService';
import { handleCarId } from '../../../store/rental/rentalSlice';
import axiosInstance from '../../../utils/Interceptors';

const DeleteCar: React.FC = () => {
  const [plate, setPlate] = useState<string>('');
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      const response = await carService.getByPlate(plate);
      if (!response.data) {
        toast.error('Bu Plakada Araç bulunmamaktadır');
        return;
      }
      
      const carData = response.data;
      const confirm = window.confirm(`${plate} plakalı aracı silmek istediğinden emin misin?`);
      if (confirm) {
        await carService.delete(carData.id);
        toast.success('Araç Başarılı bir Şekilde silindi');
      }
    } catch (error) {
      toast.error('Hata Araç Silinemedi');
    }
  };

  return (
    <div className='container' style={{ justifyContent: 'center', alignItems: 'center' }}>
      <label className='form-label'>Enter Plate:</label>
      <input className='form-control'
        type="text"
        value={plate}
        onChange={(e) => setPlate(e.target.value)}
        placeholder="Enter plate..."
      />
      <button className='btn btn-danger' onClick={handleDelete}>Delete Car</button>
    </div>
  );
};

export default DeleteCar;
