import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rentalSlice, resetRentalState, selectRental } from '../../store/rental/rentalSlice';
import carService from '../../service/baseSevice/carService';
import { differenceInDays } from "date-fns";
import { ReportHandler } from 'web-vitals';
import { useNavigate } from 'react-router-dom';
import userService from '../../service/baseSevice/userService';
import axios from 'axios';
import rentalService from '../../service/baseSevice/rentalService';


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
    return date.toLocaleDateString('tr-TR'); // Türkçe tarih formatı: gün.ay.yıl
  };

  const rentalDays = carDetails
    ? differenceInDays(new Date(rental.endDate), new Date(rental.startDate))
    : 0;
  const totalCost = rentalDays * (carDetails ? carDetails.dailyPrice : 0);


  

  const handleSubmit = async () => {
    const validityDate = `${creditCard.validityDate}`;
    const userId = auth.id;
    const cardData = {
        cardNumber: creditCard.cardNumber,
        validityDate: creditCard.validityDate,
        cardName: creditCard.cardName,
        cardCvc: creditCard.cardCvc
    };

    try {
        const rentalResponse = await rentalService.createRental(userId, rental);
        const rentalData = rentalResponse.data;

        alert('Kiralama Başarıyla oluşturuldu.');
        navigate('/success', {
            state: { info: rentalData },
        });
    } catch (error) {
        alert('Kiralama Oluşturulamadı Tekrar deneyiniz.');
        console.error('Error:', error);
    }
};




const handleClick = (event: React.FormEvent<HTMLFormElement>) => {
  console.log(creditCard)
  event.preventDefault()
  if((creditCard?.cardCvc===undefined)){
    navigate('/card'); // Tıklama olduğunda '/rental' sayfasına yönlendirme yapar

  }else{
    handleSubmit();
  }

	
};

  return (
    <div>
      {carDetails && (
        <div className="m-5 p-5">
          <section>
            <div className="row">
              <div className="col-md-7 col-lg-7 col-xl-6 mb-4 mb-md-0">
                <div>
                  <div className="d-flex justify-content-between">
                    <img
                      src={carDetails?.imagePath}
                      alt={`Car Image - ${carDetails.imagePath}`}
                      className="card-img"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-2 col-xl-4 offset-lg-5 offset-xl-2" style={{ backgroundColor: "#eee", borderRadius: '2rem' }}>
                <div>
                  <span className="fw-bold"><h1>Ödeme Özeti</h1>
				  {renderDetailItem('MARKA', carDetails.model?.brand?.name)}
                      {renderDetailItem('MODEL', carDetails.model?.name)}
                      {renderDetailItem('MODEL YILI', carDetails.modelYear)}
                      {renderDetailItem('ALIŞ TARİHİ', formatDateString(rental.startDate))}
                      {renderDetailItem('DÖNÜŞ TARİHİ', formatDateString(rental.endDate))}
				  <hr />
                  {renderDetailItem('Günlük Ücreti', `${carDetails.dailyPrice}₺`)}
                  {renderDetailItem('Kiralanacak Gün Sayısı', rentalDays)}
                  {renderDetailItem('Kdv Oranı', '%18')}
                  <hr />
                  {renderDetailItem('Günlük Ek Sigorta Ücreti', '00.00₺')}
                  {renderDetailItem('Ek Kasko Ücreti', '00.00₺')}
                  <hr />
                  {renderDetailItem('Kart Numarası', `${creditCard?.cardNumber}`)}
                  {renderDetailItem('Ad Soyad', `${creditCard?.cardName}`)}
                  {renderDetailItem('Son kullanma Tarihi', `${creditCard?.validityDate}`)}
                  {renderDetailItem('Kart Cvc',`${creditCard?.cardCvc}`)}
                  <hr />
				  <br /><br />
                  {renderDetailItem('Toplam Ücret', `${totalCost}₺`)}
				</span>
				<button className='btn btn-success' onClick={(event:any)=>handleClick(event)}>Ödeme Sayfasına yönlendir</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default RentalDetail;
