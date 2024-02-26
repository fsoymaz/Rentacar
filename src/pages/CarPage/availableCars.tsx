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
import BaseFetcher from '../../components/Fetch/BaseFetcher';
import FetchAvailableCars from '../../components/Fetch/FetchAvailableCars';

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
        <div className="container pt-5">
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
                    } }
                    locations={locations} toggleFilterMenu={function (): void {
                        throw new Error('Function not implemented.');
                    } } filterMenuVisible={false}                />

                <BaseFetcher service={() => brandService.getAll()} onBaseFetched={setBrands} />
                <BaseFetcher service={() => modelService.getAll()} onBaseFetched={setModels} />
                <BaseFetcher service={() => locationService.getAll()} onBaseFetched={setLocations} />
            </header>
            <div className="mt-5 p-5 row row-cols-1 row-cols-md-2 row-cols-lg-3">
                {state.cars.map((car) => (
                    <div key={car.id} className="col mb-4">
                        <div className="card h-100" onClick={() => handleCarClick(car.id)}>
                            <img
                                src={car?.imagePath}
                                alt="Car Image"
                                className="card-img-top"
                            />
                            <div className="card-body">
                                <h5 className="card-title">
                                    {car.modelYear} {car.model?.brand?.name}{' '}
                                    {car.model?.name}
                                </h5>
                                <h1>{car.category}</h1>
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
                            <div className="card-footer">
                                <button type="submit" className="btn btn-success" onClick={() => handleRentButtonClick(car.id)}> {car.dailyPrice}₺ Kiralama Yap</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AvailableCars;