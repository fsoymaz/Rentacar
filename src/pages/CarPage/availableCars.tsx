import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Car.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import carService from '../../service/baseSevice/carService';
import Filter from './filter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faGasPump, faPaintBrush } from '@fortawesome/free-solid-svg-icons';
import LocationSelect from './location';
import { BrandModel } from '../../models/brandModels/GetAllBrandModel';
import { modelModels } from '../../models/modelModels/GetAllModelsModel';
import { CarModel } from '../../models/carModels/GetAllCarModel';
import LocationFetcher from '../../components/Fetch/FetchLocations';
import ModelFetcher from '../../components/Fetch/FetchModels';
import BrandFetcher from '../../components/Fetch/FetchBrands';
import { RootState } from '../../store/configureStore';
import { handleCarId, handleEndDate, handleLocationId, handleStartDate, selectRental } from '../../store/rental/rentalSlice';

const AvailableCars: React.FC = () => {
    const initialState = {
        cars: [] as CarModel[],
        category: '',
        brand: '',
        model: '',
        minPrice: null as number | null,
        maxPrice: null as number | null,
    };

    const [state, setState] = useState(initialState);
    const dispatch = useDispatch();
    const rental = useSelector(selectRental);
    const { startDate, endDate, locationId } = rental;
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const handleCar = useSelector((state: RootState) => state.rental.carId);

    const [brands, setBrands] = useState<BrandModel[]>([]);
    const [models, setModels] = useState<modelModels[]>([]);
    const [locations, setLocations] = useState<{ id: number; name: string }[]>([]);

    const [filterMenuVisible, setFilterMenuVisible] = useState(false);

    const toggleFilterMenu = () => {
        setFilterMenuVisible(!filterMenuVisible);
    };
    useEffect(() => {
        fetchData();
    }, [locationId]);

    useEffect(() => {
        dispatch(handleStartDate(startDate));
        dispatch(handleEndDate(endDate))
        dispatch(handleLocationId(locationId));
        fetchData();
    }, [locationId]); // Yalnızca locationId değiştiğinde yeniden çağrılacak


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
        fetchData();
        dispatch(handleLocationId(locationId));
    };

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

    const handleCarClick = (carId: number) => {
        dispatch(handleCarId(carId));
    };

    const handleRentButtonClick = (carId: number) => {
        dispatch(handleCarId(carId));
        if (!isAuthenticated) {
            localStorage.setItem('navi', '/availableCars');
            navigate('/login');
            return;
        }
        navigate('/paymentDetail');
    };

    return (
        <div>
            <header>
                <div>
                    <div className="mnu">
                        <LocationFetcher onLocationsFetched={setLocations} />
                        <LocationSelect value={locationId} onChange={(e) => {
                            dispatch(handleLocationId(parseInt(e.target.value)));
                        }} locations={locations} />
                        <button className="filter-menu-button" onClick={toggleFilterMenu}>
                            {filterMenuVisible ? 'Hide Filters' : 'Show Filters'}
                        </button>
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
                    onStartDateChange={(date) => dispatch(handleStartDate(date))} // Alış tarihi değişikliği
                    onEndDateChange={(date) => dispatch(handleEndDate(date))} // Dönüş tarihi değişikliği
                    onApplyFilters={handleApplyFilters}
                    toggleFilterMenu={toggleFilterMenu}
                    filterMenuVisible={filterMenuVisible}
                />

                <BrandFetcher onBrandsFetched={setBrands} />
                <ModelFetcher onModelsFetched={setModels} />
            </header>
            <div className='container pt-5'>
                <div className="car-list">
                    {state.cars.map((car) => (
                        <div key={car.id}  className="card" onClick={() => handleCarClick(car.id)}>
                            <img
                                src={car?.imagePath}
                                alt="Car Image"
                                className="card-img"
                            />
                            <div className="card-body">
                                <h3 className="card-title">
                                    {car.modelYear} {car.model?.brand?.name}{' '}
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
                                    {car.location.name}
                                </div>
                            </div>
                            <button type="submit" className="btn btn-success" onClick={() => handleRentButtonClick(car.id)}> {car.dailyPrice}₺ Kiralama Yap</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AvailableCars;
