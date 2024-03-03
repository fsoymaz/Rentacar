import React, { useState } from 'react';
import './card.css'; // Stiller buraya eklenir
import axios from 'axios';
import { useSelector } from 'react-redux';
import { carSchema } from '../../components/validationSchemas/validationSchemas';
import { useNavigate } from 'react-router-dom';
import { cardSchema } from '../../components/validationSchemas/cardShema';
import axiosInstance from '../../utils/Interceptors';
import creditCardService from '../../service/baseSevice/creditCardService';

const CreditCardForm: React.FC = () => {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardHolder, setCardHolder] = useState<string>('');
  const [expirationMonth, setExpirationMonth] = useState<string>('');
  const [expirationYear, setExpirationYear] = useState<string>('');
  const [ccv, setCcv] = useState<string>('');
  const authState = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/[^\d]/g, '').substring(0, 16);
    value = value.replace(/^(.{12})(.{4})$/, (_, masked, lastFour) => masked.replace(/./g, '*') + lastFour);
    value = value.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(value);
  };

  const handleCardHolderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardHolder(event.target.value.toUpperCase());
  };

  const handleExpirationMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setExpirationMonth(event.target.value);
  };

  const handleExpirationYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setExpirationYear(event.target.value);
  };

  const handleCcvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCcv(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validityDate = `${expirationMonth}/${expirationYear}`;
    const userId = authState && authState.id;
    const cardData = {
      cardNumber,
      validityDate,
      cardName: cardHolder,
      cardCvc: ccv
    };

    try {
      const response = await creditCardService.ad(cardData, userId);

      if (response.status === 201) {
        alert('Kart bilgileri başarıyla kaydedildi.');
        navigate('/paymentDetail');
      }
      console.log('Response:', response.data);
    } catch (error) {
      alert('Kart bilgileri kaydedilmedi. Lütfen tekrar deneyin.');
      console.error('Error:', error);
    }
  };

  // Ay ve yıl seçenekleri
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1).toString().padStart(2, '0');
    return <option key={month} value={month}>{month}</option>;
  });

  const years = Array.from({ length: 10 }, (_, i) => {
    const year = (i + 2022).toString();
    return <option key={year} value={year}>{year}</option>;
  });

  return (
    <div className="container row">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="checkout">
            <div className="credit-card-box">
              <div className="flip">
                <div className="front">
                  <div className="chip"></div>
                  <div className="number">{cardNumber}</div>
                  <div className="card-holder">
                    <label>Card holder</label>
                    <div>{cardHolder}</div>
                  </div>
                  <div className="card-expiration-date">
                    <label>Expires</label>
                    <div>{expirationMonth}/{expirationYear}</div>
                  </div>
                </div>
                <div className="back">
                  <div className="strip"></div>
                  <div className="logo">
                  </div>
                  <div className="ccv">
                    <label>CCV</label>
                    <div>{ccv}</div>
                  </div>
                </div>
              </div>
            </div>
            <form className="form" onSubmit={handleSubmit} autoComplete="off" noValidate>
              <div className="form-group">
                <label htmlFor="card-number">Kart Numarası</label>
                <input
                  type="text"
                  id="card-number"
                  className="form-control"
                  maxLength={19}
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="card-holder">Kart İsmi</label>
                <input
                  type="text"
                  id="card-holder"
                  className="form-control"
                  value={cardHolder}
                  onChange={handleCardHolderChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="card-expiration-month">Son Kullanma Tarihi</label>
                <div className="d-flex">
                  <select
                    id="card-expiration-month"
                    className="form-control mr-2"
                    value={expirationMonth}
                    onChange={handleExpirationMonthChange}
                  >
                    <option value="">Ay</option>
                    {months}
                  </select>
                  <select
                    id="card-expiration-year"
                    className="form-control"
                    value={expirationYear}
                    onChange={handleExpirationYearChange}
                  >
                    <option value="">Yıl</option>
                    {years}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="card-ccv">CCV</label>
                <input
                  type="text"
                  id="card-ccv"
                  className="form-control"
                  maxLength={3}
                  value={ccv}
                  onChange={handleCcvChange}
                />
              </div>
              <button type="submit" className="btn btn-primary"><i className="fa fa-lock"></i> Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreditCardForm;
