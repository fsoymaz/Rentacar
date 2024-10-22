import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Car.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faCog, faGasPump, faIdCard, faMoneyBill, faPaintBrush, faUser } from '@fortawesome/free-solid-svg-icons';
import carService from '../../service/baseSevice/carService';
import { GetAllCarResponse } from '../../models/cars/response/getAllCarResponse';
import Header from '../../components/Header/Header';

interface CategoryCarsProps { }

const CategoryCars: React.FC<CategoryCarsProps> = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const category = query.get('category');
  const [cars, setCars] = useState<GetAllCarResponse[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await carService.getCarsByCategory(category || '');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars by category:', error);
      }
    };

      fetchCars();
  }, [category]);

  return (
    <div>
      <Header backgroundImage="/logo/carPage.jpg" />
      <div className="car-list p-5">
        {cars.map((car) => (
             <motion.div key={car.id} whileHover={{ scale: 1.05 }} className="card">
             <img
               src={car?.imageUrl}
               alt={`Car Image - ${car.imageUrl}`}
               className="card-img"
             />
             <div className="card-body">
               <h3 className="card-title">
                 {car.modelYear} {car.brandName}{" "}
                 {car.modelName}
               </h3>
               <div className="icon-section">
                 <div className="icons">
                   <FontAwesomeIcon icon={faGasPump} /> {car.fuelType}
                 </div>
                 <div className="icons">
                   <FontAwesomeIcon icon={faCar} />{car.transmissionType}
                 </div>
                 <div className="icons">
                   <FontAwesomeIcon icon={faPaintBrush} /> {car.colorName}
                 </div>
               </div>
             </div>
           </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCars;
