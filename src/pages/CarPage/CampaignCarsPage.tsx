import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectRental, handleStartDate, handleEndDate } from '../../store/rental/rentalSlice';
import BaseFetcher from '../../components/Fetch/BaseFetcher';
import carService from '../../service/baseSevice/carService';
import { AddCarResponse } from '../../models/cars/response/addCarResponse';

type Props = {}

const CampaignCarsPage = (props: Props) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const rental = useSelector(selectRental);
  const user = useSelector((state: any) => state.auth.id);
  const [car, setCar] = useState<AddCarResponse | null>(null); // car state'inin tipini AddCarResponse olarak belirleyin

  const handleStartDateChange = (date: string) => {
    dispatch(handleStartDate(date));
  }

  const handleEndDateChange = (date: string) => {
    dispatch(handleEndDate(date));
  }

  const handleRental = async () => {
    try {
      if (user === 0) {
        localStorage.setItem('navi', '/paymentDetail')
        history('/login');
        return;
      }
      history('/paymentDetail');
    } catch (error) {
      console.error(error);
    }
  }

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);

  return (
    <div className="campaign-cars-page">
      <BaseFetcher service={() => carService.getById(rental.carId)} onBaseFetched={setCar} params={[rental.carId]} />
      {car && (
        <>
          <img src={car.imagePath} alt={car.model.name} />
          <p>Year: {car.modelYear}</p>
          <p>Plate: {car.plate}</p>
          <p>Price: {car.dailyPrice}</p>
        </>
      )}
      <input type="date" min={today.toISOString().split('T')[0]} max={maxDate.toISOString().split('T')[0]} onChange={(e) => handleStartDateChange(e.target.value)} />

      <input type="date" min={today.toISOString().split('T')[0]} max={maxDate.toISOString().split('T')[0]} onChange={(e) => handleEndDateChange(e.target.value)} />
      
      <button onClick={handleRental}>Rent a Car</button>
    </div>
  )
}

export default CampaignCarsPage;