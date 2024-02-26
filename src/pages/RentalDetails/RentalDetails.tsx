import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import carService from '../../service/baseSevice/carService';
import { differenceInDays } from "date-fns";
import { useNavigate } from 'react-router-dom';
import userService from '../../service/baseSevice/userService';
import rentalService from '../../service/baseSevice/rentalService';
import './rental.css';
import { logoutRental, selectRental } from '../../store/rental/rentalSlice';

const RentalDetail = () => {
  const rental = useSelector(selectRental);
  const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const [carDetails, setCarDetails] = useState<any>(null);
  const [creditCard, setCreditCard] = useState<any>(null);
  const carId = rental.carId;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarDetails = async () => {
      if (carId) {
        try {
          const response = await carService.getById(carId);
          setCarDetails(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchCarDetails();
    fetchCreditCart();
  }, [carId]);

  const fetchCreditCart = async () => {
    try {
      const response = await userService.getCreditCardById(auth.id);
      setCreditCard(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderDetailItem = (label: string, value: string | number) => (
    <div className="detail-item">
      <div className="d-flex justify-content-between">
        <span>{label}</span>
        <span>{value}</span>
      </div>
    </div>
  );

  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR');
  };

  const rentalDays = carDetails
    ? differenceInDays(new Date(rental.endDate), new Date(rental.startDate))
    : 0;
  const totalCost = rentalDays * (carDetails ? carDetails.dailyPrice : 0);

  const handlePaymentRedirect = async () => {
    if (creditCard?.cardCvc === undefined) {
      navigate('/card');
    } else {
      try {
        const userId = auth.id;
        const rentalResponse = await rentalService.createRental(userId, rental);
        const rentalData = rentalResponse.data;      
        alert('Kiralama Başarıyla tamamlandı.');
        navigate('/invoice', {
          state: { info: rentalData }
        });
      } catch (error) {
        alert('Kiralama işlemi sırasında bir hata oluştu. Lütfen tekrar deneyiniz.');
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="container mt-5 p-5">
      {carDetails && (
        <div className="row">
          <div className="col-md-6">
            <img
              src={carDetails?.imagePath}
              alt={`Car Image - ${carDetails.imagePath}`}
              className="img-fluid rounded shadow-lg"
            />
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h1 className="card-title">Ödeme Özeti</h1>
                {renderDetailItem('MARKA', carDetails.model?.brand?.name)}
                {renderDetailItem('MODEL', carDetails.model?.name)}
                {renderDetailItem('MODEL YILI', carDetails.modelYear)}
                {renderDetailItem('ALIŞ TARİHİ', formatDateString(rental.startDate))}
                {renderDetailItem('DÖNÜŞ TARİHİ', formatDateString(rental.endDate))}
              </div>
            </div>
            <div className="card mt-3">
              <div className="card-body">
                {renderDetailItem('Günlük Ücreti', `${carDetails.dailyPrice}₺`)}
                {renderDetailItem('Kiralanacak Gün Sayısı', rentalDays)}
                {renderDetailItem('Kdv Oranı', '%18')}
              </div>
            </div>
            <div className="card mt-3">
              <div className="card-body">
                {renderDetailItem('Kart Numarası', `${creditCard?.cardNumber}`)}
                {renderDetailItem('Ad Soyad', `${creditCard?.cardName}`)}
                {renderDetailItem('Son kullanma Tarihi', `${creditCard?.validityDate}`)}
                {renderDetailItem('Kart Cvc', `${creditCard?.cardCvc}`)}
              </div>
            </div>
            <div className="card mt-3">
              <div className="card-body">
                {renderDetailItem('Toplam Ücret', `${totalCost}₺`)}
                {creditCard?.cardCvc === undefined ? (
                  <button className='btn btn-success mt-3' onClick={() => navigate('/card')}>
                    Kredi Kartı Bilgilerini Gir
                  </button>
                ) : (
                  <button className='btn btn-primary mt-3' onClick={handlePaymentRedirect}>
                    Kiralamayı Tamamla
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RentalDetail;
