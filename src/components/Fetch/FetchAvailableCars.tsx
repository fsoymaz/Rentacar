// FetchAvailableCars.tsx
import React from 'react';
import carService from '../../service/baseSevice/carService';

interface FetchDataProps {
  startDate: string;
  endDate: string;
  locationId: number;
  state: any; // Bu tipi durumunuzun gerçek tipine göre değiştirin
  setState: React.Dispatch<React.SetStateAction<any>>; // Bu tipi durumunuzun gerçek tipine göre değiştirin
}

const FetchAvailableCars: React.FC<FetchDataProps> = ({ startDate, endDate, locationId, state, setState }) => {
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const cars = await carService.getAvailableCarsByCategory(
          startDate,
          endDate,
          locationId,
          state.category,
          state.brand,
          state.model,
          state.minPrice,
          state.maxPrice
        );
        setState({ ...state, cars });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [startDate, endDate, locationId, state.category, state.brand, state.model, state.minPrice, state.maxPrice]);

  return null;
};

export default FetchAvailableCars;