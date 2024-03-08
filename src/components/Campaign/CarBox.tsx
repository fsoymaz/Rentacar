import React, { useState } from "react";
import "./Campaign.scss";
import translate from "./translate";
import { handleCarId } from "../../store/rental/rentalSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";




interface CarBoxProps {
  data: any;
}

const CarBox: React.FC<CarBoxProps> = ({ data }: CarBoxProps): JSX.Element => {
  const [carLoad, setCarLoad] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // data undefined değilse devam et, aksi halde boş bir dizi kullan
  const carsArray = Array.isArray(data) ? data : [data];

  const handleRentNowClick = (carId: number) => {
    dispatch(handleCarId(carId));
    navigate("/campainCar");
  }

  return (
    <>
      {carsArray.map((car: any, id: any) => (
        <div key={id} className="box-cars">
          {/* car */}
          <div className="pick-car">
            {carLoad && <span className="loader"></span>}
            <img
              style={{ display: carLoad ? "none" : "block" }}
              src={car.imagePath}
              alt="car_img"
              onLoad={() => setCarLoad(false)}
            />
          </div>
          {/* description */}
          <div className="pick-description">
            <div className="pick-description__price">
              <span style={{ fontSize: "0.8em", color: "black", marginRight: "5px" }}>{car.discount}% </span>
              <span style={{ textDecoration: "line-through", textDecorationColor: "black", marginRight: "10px" }}>{car.dailyPrice}₺</span>
              <span>{car.dailyPrice - (car.dailyPrice * car.discount / 100)}₺</span>
            </div>

            <div className="pick-description__table">

              <div className="pick-description__table__col">
                <span>Marka</span>
                <span>{car.brandName}</span>
              </div>

              <div className="pick-description__table__col">
                <span>Model</span>
                <span>{car.modelName}</span>
              </div>


              <div className="pick-description__table__col">
                <span>Yıl</span>
                <span>{car.modelYear}</span>
              </div>

              <div className="pick-description__table__col">
                <span>Yolcu</span>
                <span>{car.passengerCapacity}</span>
              </div>

              <div className="pick-description__table__col">
                <span>Vites</span>
                <span>{translate(car.transmissionType)} </span>
              </div>

              <div className="pick-description__table__col">
                <span>Yakıt</span>
                <span>{translate(car.fuelType)}</span>
              </div>
            </div>
            {/* btn cta */}
            <button className="cta-btn" onClick={() => handleRentNowClick(car.id)}>
            Şimdi Kirala
          </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default CarBox;