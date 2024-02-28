import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Filter from './filter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faGasPump, faPaintBrush } from '@fortawesome/free-solid-svg-icons';
import { BrandModel } from '../../models/brandModels/GetAllBrandModel';
import { modelModels } from '../../models/modelModels/GetAllModelsModel';
import { GetAllCarResponse } from '../../models/cars/response/getAllCarResponse';
import { handleCarId, handleEndDate, handleLocationId, handleStartDate, selectRental } from '../../store/rental/rentalSlice';
import { RootState } from '../../store/configureStore';
import modelService from '../../service/baseSevice/modelService';
import brandService from '../../service/baseSevice/brandService';
import locationService from '../../service/baseSevice/locationService';
import rentalService from '../../service/baseSevice/rentalService'; // rentalService import edildi
import BaseFetcher from '../../components/Fetch/BaseFetcher';
import FetchAvailableCars from '../../components/Fetch/FetchAvailableCars';
import { motion } from "framer-motion";
import { toast } from 'react-toastify';

const AvailableCars: React.FC = () => {
    const initialState = {
        cars: [] as GetAllCarResponse[],
        category: '',
        brand: '',
        model: '',
        minPrice: null as number | null,
        maxPrice: null as number | null,
    };

    const [state, setState] = useState(initialState);
    const dispatch = useDispatch();
    const rental = useSelector(selectRental);
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const email = useSelector((state: RootState) => state.auth.email);

    const [brands, setBrands] = useState<BrandModel[]>([]);
    const [models, setModels] = useState<modelModels[]>([]);
    const [locations, setLocations] = useState<{ id: number; name: string }[]>([]);


    const handleCategoryChange = (category: string) => {
        setState({ ...state, category });
    };

    const handleBrandChange = (brand: string) => {
        setState({ ...state, brand });
    };

    const handleModelChange = (model: string) => {
        setState({ ...state, model });
    };

    const handleMinPriceChange = (price: number) => {
        setState({ ...state, minPrice: price });
    };

    const handleMaxPriceChange = (price: number) => {
        setState({ ...state, maxPrice: price });
    };

    const handleApplyFilters = () => {
        console.log('Applying filters', state);
        dispatch(handleLocationId(rental.locationId));
    };

    const handleCarClick = (carId: number) => {
        dispatch(handleCarId(carId));
    };

    const handleRentButtonClick = async (carId: number) => {
        dispatch(handleCarId(carId));
        if (!isAuthenticated) {
            localStorage.setItem('navi', '/availableCars');
            navigate('/login');
            return;
        }
    
        try {
            // Filtrelenmiş araç listesini Redux store'dan alın
            const filteredCars = state.cars;
    
            // Filtreleme işlemi sırasında seçilen başlangıç ve bitiş tarihlerini Redux store'dan alın
            const { startDate, endDate } = rental;
    
            // Kiralama bilgilerini Redux store'dan alın
            const rentalResponse = await rentalService.getRentalUser(email);
            const rentals = rentalResponse.data;
    
            // Filtrelenmiş araçlar içinde dönerek, her bir aracın kiralama tarihlerini kontrol edin
            const hasExistingRental = rentals.some((rental: any) => {
                const rentalStartDate = new Date(rental.startDate);
                const rentalEndDate = new Date(rental.endDate);
                const selectedStartDate = new Date(startDate);
                const selectedEndDate = new Date(endDate);
                
                // Seçilen tarih aralığı ile kiralama tarihleri arasında çakışma kontrolü yapın
                return (
                    (selectedStartDate >= rentalStartDate && selectedStartDate <= rentalEndDate) || 
                    (selectedEndDate >= rentalStartDate && selectedEndDate <= rentalEndDate)
                );
            });
    
            if (hasExistingRental) {
                toast.error('There is an existing rental within selected dates. Please choose different dates.');
                return;
            }
    
            navigate('/paymentDetail');
        } catch (error) {
            console.error('Error while fetching rental data:', error);
            toast.error('An error occurred while fetching rental data.');
        }
    };
    
    
    return (
        <div className="available">
            <header>
                <div>
                    <div className="mnu">
                        <FetchAvailableCars
                            startDate={rental.startDate}
                            endDate={rental.endDate}
                            locationId={rental.locationId}
                            category={state.category}
                            brand={state.brand}
                            model={state.model}
                            minPrice={state.minPrice}
                            maxPrice={state.maxPrice}
                            setState={setState}
                        />
                    </div>
                </div>
                <Filter
                    category={state.category}
                    brands={brands}
                    models={models}
                    onCategoryChange={handleCategoryChange}
                    onBrandChange={handleBrandChange}
                    onModelChange={handleModelChange}
                    onMinPriceChange={handleMinPriceChange}
                    onMaxPriceChange={handleMaxPriceChange}
                    onStartDateChange={(date) => dispatch(handleStartDate(date))}
                    onEndDateChange={(date) => dispatch(handleEndDate(date))}
                    onApplyFilters={handleApplyFilters}
                    locationId={rental.locationId}
                    onLocationChange={(e) => {
                        dispatch(handleLocationId(parseInt(e.target.value)));
                    }}
                    locations={locations} toggleFilterMenu={function (): void {
                        throw new Error('Function not implemented.');
                    }} filterMenuVisible={false} />

                <BaseFetcher service={() => brandService.getAll()} onBaseFetched={setBrands} />
                <BaseFetcher service={() => modelService.getAll()} onBaseFetched={setModels} />
                <BaseFetcher service={() => locationService.getAll()} onBaseFetched={setLocations} />
            </header>
            <div className="car-list p-5">
                {state.cars.map((car) => (
                  <motion.div key={car.id} whileHover={{ scale: 1.05 }} className="card mb-3">
                  <img
                    src={car?.imagePath}
                    alt={`Car Image - ${car.imagePath}`}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {car.modelYear} {car.model?.brand?.name} {car.model?.name}
                    </h5>
                    <p className="card-text">Plate: {car.plate}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <p className="mb-0">
                          <FontAwesomeIcon icon={faGasPump} /> {car.fuelType}
                        </p>
                        <p className="mb-0">
                          <FontAwesomeIcon icon={faCar} /> {car.transmissionType}
                        </p>
                        <p className="mb-0">
                          <FontAwesomeIcon icon={faPaintBrush} /> {car.color?.name}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => handleRentButtonClick(car.id)}
                      >
                        {car.dailyPrice}₺ Kiralama Yap
                      </button>
                    </div>
                  </div>
                </motion.div>
                ))}
            </div>
        </div>
    );
}

export default AvailableCars;
