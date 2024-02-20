import React, { useEffect } from 'react';
import brandService from '../../service/baseSevice/brandService';

interface BrandFetcherProps {
    onBrandsFetched: (brands: any) => void;
}

const BrandFetcher: React.FC<BrandFetcherProps> = ({ onBrandsFetched }) => {
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const brandsResponse = await brandService.getAll();
                onBrandsFetched(brandsResponse.data);
            } catch (error) {
                console.error('Error fetching brands and models:', error);
            }
        };

        fetchBrands();
    }, [onBrandsFetched]);

    return null; // Bu bileşen görsel bir şey döndürmeyecek, sadece veri getirecek
};

export default BrandFetcher;