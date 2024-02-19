import React, { useEffect } from 'react';
import colorService from '../../service/baseSevice/colorService';

interface ColorFetcherProps {
    onColorsFetched: (models: any) => void;
}

const ColorFetcher: React.FC<ColorFetcherProps> = ({ onColorsFetched }) => {
    useEffect(() => {
        const fetchColors = async () => {
            try {
                const colorsResponse = await colorService.getAll();
                onColorsFetched(colorsResponse.data);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchColors();

    }, [onColorsFetched]);

    return null; // Bu bileşen görsel bir şey döndürmeyecek, sadece veri getirecek
};

export default ColorFetcher;