import React from 'react';
import carService from '../../service/baseSevice/carService';

interface FetchDataProps {
  startDate: string;
  endDate: string;
  locationId: number;
  category: string;
  brand: string;
  model: string;
  minPrice: number | null;
  maxPrice: number | null;
  setState: React.Dispatch<React.SetStateAction<any>>;
}

const FetchAvailableCars: React.FC<FetchDataProps> = ({ startDate, endDate, locationId, category, brand, model, minPrice, maxPrice, setState }) => {
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const cars = await carService.getAvailableCarsByCategory(
          startDate,
          endDate,
          locationId,
          category,
          brand,
          model,
          minPrice,
          maxPrice
        );
        setState((prevState: any) => ({ ...prevState, cars }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [startDate, endDate, locationId, category, brand, model, minPrice, maxPrice, setState]);

  return null;
};

export default FetchAvailableCars;
