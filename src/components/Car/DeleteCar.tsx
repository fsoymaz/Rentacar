import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import carService from '../../service/baseSevice/carService';
import { handleCarId } from '../../store/rental/rentalSlice';
import axiosInstance from '../../utils/Interceptors';

const DeleteCar: React.FC = () => {
  const [plate, setPlate] = useState<string>('');
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      // Plakanın varlığını kontrol et
      const response = await carService.getByPlate(plate);
      if (!response.data) {
        toast.error('Car with the provided plate does not exist');
        return;
      }
      
      const carData = response.data;
      console.log('carData:', carData);
      const confirm = window.confirm(`Are you sure you want to delete the car with plate number ${plate}?`);
      if (confirm) {
        await axiosInstance.delete(`http://localhost:8080/api/cars/${carData.id}`);
        toast.success('Car deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting car:', error);
      toast.error('Error deleting car');
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
