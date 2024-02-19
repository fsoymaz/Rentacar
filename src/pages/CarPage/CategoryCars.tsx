import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { CarModel } from '../../models/carModels/GetAllCarModel';
import { motion } from 'framer-motion';
import './Car.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faCog, faGasPump, faIdCard, faMoneyBill, faPaintBrush, faUser } from '@fortawesome/free-solid-svg-icons';
import carService from '../../service/baseSevice/carService';

interface CategoryCarsProps { }

const CategoryCars: React.FC<CategoryCarsProps> = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const category = query.get('category');
  const [cars, setCars] = useState<CarModel[]>([]);

  useEffect(() => {
    console.log('category:', category);
    const fetchCars = async () => {
      try {
        const response = await carService.getCarsByCategory(category || '');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars by category:', error);
      }
    };

    if (category) {
      fetchCars();
    }
  }, [category]);

  return (
    <div>
      <div className="car-list p-5">
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

export default CategoryCars;
