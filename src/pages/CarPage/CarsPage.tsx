// Cars.tsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "../../components/Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faCog,
  faGasPump,
  faIdCard,
  faMoneyBill,
  faPaintBrush,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./Car.css";
import carService from "../../service/baseSevice/carService";
import CarFetcher from "../../components/Fetch/FetchCars";
import { GetAllCarResponse } from "../../models/cars/response/getAllCarResponse";

interface CarsPageProps {}

const Cars: React.FC<CarsPageProps> = () => {
  const [cars, setCars] = useState<GetAllCarResponse[]>([]);

 

  return (
    <div className="CarPage">
      <Header backgroundImage="/logo/carPage.jpg" />
      <div className="car-list p-5">
         <CarFetcher onCarsFetched={setCars} />
        {cars.map((car) => (
          <motion.div key={car.id} whileHover={{ scale: 1.05 }} className="card">
            <img
              src={car?.imagePath}
              alt={`Car Image - ${car.imagePath}`}
              className="card-img"
            />
            <div className="card-body">
              <h3 className="card-title">
                {car.modelYear} {car.model?.brand?.name}{" "}
                {car.model?.name}
              </h3>
              <div className="icon-section">
                <div className="icons">
                  <FontAwesomeIcon icon={faGasPump} /> {car.fuelType}
                </div>
                <div className="icons">
                  <FontAwesomeIcon icon={faCar} />{car.transmissionType}
                </div>
                <div className="icons">
                  <FontAwesomeIcon icon={faPaintBrush} /> {car.color?.name}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
