import React, { useEffect } from 'react';
import locationService from '../../service/baseSevice/locationService';

interface LocationFetcherProps {
    onLocationsFetched: (locations: any) => void;
}

const LocationFetcher: React.FC<LocationFetcherProps> = ({ onLocationsFetched }) => {
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const locationsResponse = await locationService.getAll();
                onLocationsFetched(locationsResponse.data);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchLocations();

    }, [onLocationsFetched]);

    return null; // Bu bileşen görsel bir şey döndürmeyecek, sadece veri getirecek
};

export default LocationFetcher;