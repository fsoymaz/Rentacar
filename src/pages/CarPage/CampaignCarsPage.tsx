import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectRental, handleStartDate, handleEndDate } from '../../store/rental/rentalSlice';

type Props = {}

const CampaignCarsPage = (props: Props) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const rental = useSelector(selectRental);
  const user = useSelector((state: any) => state.auth.id);

  const handleStartDateChange = (date: string) => {
    dispatch(handleStartDate(date)); // tarih değerini gönder
  }

  const handleEndDateChange = (date: string) => {
    dispatch(handleEndDate(date)); // tarih değerini gönder
  }

  const handleRental = async () => {
    try {
      history('/paymentDetail'); // Kullanıcıyı paymentDetails sayfasına yönlendir
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <input type="date" onChange={(e) => handleStartDateChange(e.target.value)} />
      <input type="date" onChange={(e) => handleEndDateChange(e.target.value)} />
      <button onClick={handleRental}>Rent a Car</button>
    </div>
  )
}

export default CampaignCarsPage;