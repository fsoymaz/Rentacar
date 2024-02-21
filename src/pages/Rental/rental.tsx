import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCar,
  faGasPump,
  faPaintBrush,
} from "@fortawesome/free-solid-svg-icons";
import { RentalState, rentalSlice, resetRentalState, selectRental } from "../../store/rental/rentalSlice";
import { RootState } from "../../store/configureStore";
import carService from "../../service/baseSevice/carService";

function RentalForm() {
  const rental: RentalState = useSelector(selectRental);
  const [carDetails, setCarDetails] = useState<any>(null);

  const carId = rental.carId;

  useEffect(() => {
    if (carId) {
      const fetchCarDetails = async () => {
        try {
          const response = await carService.getById(carId);
          setCarDetails(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchCarDetails();
    }
  }, [carId]);

  return (
    <div>
      <div >
      </div>
      <button type='submit' className='btn btn-success' >Kirala</button>
    </div>
  );
}

export default RentalForm;
