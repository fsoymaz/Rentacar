import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './RentACarForm.css';
import { useNavigate } from 'react-router-dom';
import { handleEndDate, handleStartDate, selectRental, handleLocationId } from '../../store/rental/rentalSlice';
import carService from '../../service/baseSevice/carService';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { locationModels } from '../../models/locations/locationModels';
import BaseFetcher from '../Fetch/BaseFetcher';
import locationService from '../../service/baseSevice/locationService';
import rentalService from '../../service/baseSevice/rentalService'; // rentalService import edildi

const RentACarForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { startDate, endDate, locationId } = useSelector(selectRental);
  const [pickupDate, setPickupDate] = useState<string>(startDate);
  const [deliveryDate, setDeliveryDate] = useState<string>(endDate);
  const [locations, setLocations] = useState<locationModels[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<number | undefined>(locationId);
  const authState = useSelector((store: any) => store.auth.email);

  const RentACarFormSchema = Yup.object().shape({
    pickupDate: Yup.date().min(new Date(), 'Pickup date must be today or later').required('Pickup date is required'),
    deliveryDate: Yup.date().min(Yup.ref('pickupDate'), 'Delivery date must be after pickup date').required('Delivery date is required'),
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!pickupDate || !deliveryDate) {
        toast.error('Please select pickup and delivery dates');
        return;
      }
      if (!selectedLocation) {
        toast.error('Please select a location');
        return;
      }
      await RentACarFormSchema.validate({ pickupDate, deliveryDate });
      
      // Rental verilerini almak için rentalService kullanılıyor
      const rentalResponse = await rentalService.getRentalUser(authState); // email buradan gelmeli
      const rentals = rentalResponse.data;

      // Başlangıç ve bitiş tarihlerini kontrol et
      const hasExistingRental = rentals.some((rental: any) => {
        const rentalStartDate = new Date(rental.startDate);
        const rentalEndDate = new Date(rental.endDate);
        const selectedStartDate = new Date(pickupDate);
        const selectedEndDate = new Date(deliveryDate);
        console.log(rentalStartDate, rentalEndDate, selectedStartDate, selectedEndDate);
        return (selectedStartDate >= rentalStartDate && selectedStartDate <= rentalEndDate) || (selectedEndDate >= rentalStartDate && selectedEndDate <= rentalEndDate);
      });

      if (hasExistingRental) {
        toast.error('There is an existing rental within selected dates. Please choose different dates.');
        return;
      }

      const response = await carService.getAvailableCars(pickupDate, deliveryDate, selectedLocation);
      dispatch(handleLocationId(selectedLocation));
      navigate(`/availableCars`);
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
      <h1 style={{color: 'white', fontSize: '2.5rem'}}>Hadi Şimdi Kirala</h1>
      <form onSubmit={handleSubmit}>
        <label style={{color: 'white', fontSize: '1.2rem'}}> Araç Lokasyonu</label>
        <BaseFetcher service={() => locationService.getAll()} onBaseFetched={setLocations} />
        <select id="pickupLocation" onChange={(e) => {
          const locationId = parseInt(e.target.value);
          setSelectedLocation(locationId);
        }}>
          <option value="">Lokasyon Seç</option>
          {locations.map(location => (
            <option key={location.id} value={location.id}>{location.name}</option>
          ))}
        </select>
        <div className="fechas">
          <div className="fecha">
            <label style={{color: 'white', fontSize: '1.2rem'}} htmlFor="pickupDate">A. Tarihi</label>
            <input id="pickupDate" type="date" value={pickupDate} onChange={handleStartDateChange} />
          </div>
          <div className="fecha">
            <label style={{color: 'white', fontSize: '1.2rem'}} htmlFor="deliveryDate">D. Tarihi</label>
            <input id="deliveryDate" type="date" value={deliveryDate} onChange={handleEndDateChange} />
          </div>
        </div>
        <input type="submit" value="Kirala" />
      </form>
    </div>
  );
};

export default RentACarForm;
