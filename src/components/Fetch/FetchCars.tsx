import React, { useEffect } from 'react';
import carService from '../../service/baseSevice/carService';

interface CarFetcherProps {
    onCarsFetched: (car: any) => void;
}

const CarFetcher: React.FC<CarFetcherProps> = ({ onCarsFetched }) => {
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const carsResponse = await carService.getAll();
                onCarsFetched(carsResponse.data);
            } catch (error) {
                console.error('Error fetching : ', error);
            }
        };

        fetchCars();

    }, [onCarsFetched]);

    return null; // Bu bileşen görsel bir şey döndürmeyecek, sadece veri getirecek
};

export default CarFetcher;