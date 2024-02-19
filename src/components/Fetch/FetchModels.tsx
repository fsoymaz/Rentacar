import React, { useEffect } from 'react';
import modelService from '../../service/baseSevice/modelService';

interface ModelFetcherProps {
    onModelsFetched: (models: any) => void;
}

const ModelFetcher: React.FC<ModelFetcherProps> = ({ onModelsFetched }) => {
    useEffect(() => {
        const fetchColors = async () => {
            try {
                const modelsResponse = await modelService.getAll();
                onModelsFetched(modelsResponse.data);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchColors();

    }, [onModelsFetched]);

    return null; // Bu bileşen görsel bir şey döndürmeyecek, sadece veri getirecek
};

export default ModelFetcher;