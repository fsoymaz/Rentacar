import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './RentACarForm.css';
import { useNavigate } from 'react-router-dom';
import { handleEndDate, handleStartDate, selectRental, handleLocationId } from '../../store/rental/rentalSlice'; // changeLocationId import edildi
import axios from 'axios';
import carService from '../../service/baseSevice/carService';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { locationModels } from '../../models/locations/locationModels';
import BaseFetcher from '../Fetch/BaseFetcher';
import locationService from '../../service/baseSevice/locationService';


const RentACarForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { startDate, endDate, locationId } = useSelector(selectRental); // locationId eklendi
  const [pickupDate, setPickupDate] = useState<string>(startDate);
  const [deliveryDate, setDeliveryDate] = useState<string>(endDate);
  const [locations, setLocations] = useState<locationModels[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<number | undefined>(locationId); // locationId ile başlatıldı

  const RentACarFormSchema = Yup.object().shape({
    pickupDate: Yup.date().min(new Date(), 'Pickup date must be today or later').required('Pickup date is required'),
    deliveryDate: Yup.date().min(Yup.ref('pickupDate'), 'Delivery date must be after pickup date').required('Delivery date is required'),
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await RentACarFormSchema.validate({ pickupDate, deliveryDate });
      if (selectedLocation !== undefined) {
        const response = await carService.getAvailableCars(pickupDate, deliveryDate, selectedLocation);
        dispatch(handleLocationId(selectedLocation)); // Redux store'a seçilen lokasyonu gönder
        navigate(`/availableCars`);
      } else {
        toast.error('Please select a location');
      }
    } catch (error) {
      toast.error('Form validation error');
    }
  };

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPickupDate(value);
    dispatch(handleStartDate(value));
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setDeliveryDate(value);
    dispatch(handleEndDate(value));
  };

  return (
    <div className="blanco">
      <div className="amarillo"></div>
      <div className="naranja"></div>
      <h1>Hadi Şimdi Kirala</h1>
      <form onSubmit={handleSubmit}>
        <label > Araç Lokasyonu</label>
        <BaseFetcher service={() => locationService.getAll()} onBaseFetched={setLocations} />
        <select id="pickupLocation" onChange={(e) => {
          const locationId = parseInt(e.target.value);
          setSelectedLocation(locationId);
        }}>
          <option value="">Lokasyon Seç</option>
          {locations.map(location => (
            <option  key={location.id} value={location.id}>{location.name}</option>
          ))}
        </select>
        <div className="fechas">
          <div className="fecha">
            <label htmlFor="pickupDate">A. Tarihi</label>
            <input id="pickupDate" type="date" value={pickupDate} onChange={handleStartDateChange} />
          </div>
          <div className="fecha">
            <label htmlFor="deliveryDate">D. Tarihi</label>
            <input id="deliveryDate" type="date" value={deliveryDate} onChange={handleEndDateChange} />
          </div>
        </div>
        <input type="submit" value="Search" />
      </form>
    </div>
  );
};

export default RentACarForm;