import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Filter from './filter';
import { GetAllCarResponse } from '../../models/cars/response/getAllCarResponse';
import { handleCarId, handleEndDate, handleLocationId, handleStartDate, selectRental } from '../../store/rental/rentalSlice';
import { RootState } from '../../store/configureStore';
import rentalService from '../../service/baseSevice/rentalService'; // rentalService import edildi
import FetchAvailableCars from '../../components/Fetch/FetchAvailableCars';
import { toast } from 'react-toastify';
import { Grid, Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import { selectFilter } from '../../store/filter/filterSlice';
import BaseFetcher from '../../components/Fetch/BaseFetcher';
import carService from '../../service/baseSevice/carService';

const AvailableCars: React.FC = () => {
    const initialState = {
        cars: [] as GetAllCarResponse[],
        category: '',
        brand: '',
        model: '',
        minPrice: null as number | null,
        maxPrice: null as number | null,
        applyFilter: false // New state to trigger filter

    };



    const [state, setState] = useState(initialState);
    const dispatch = useDispatch();
    const rental = useSelector(selectRental);
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const email = useSelector((state: RootState) => state.auth.email);
    const {
        category,
        minPrice,
        maxPrice,
    } = useSelector(selectFilter);

    const filter = useSelector(selectFilter); // Retrieve filter state

    const handleRentButtonClick = async (carId: number) => {
        dispatch(handleCarId(carId));
        if (!isAuthenticated) {
            localStorage.setItem('navi', '/availableCars');
            navigate('/login');
            return;
        }

        try {
            const filteredCars = state.cars;

            const { startDate, endDate } = rental;

            const rentalResponse = await rentalService.getRentalUser(email);
            const rentals = rentalResponse.data;

            const hasExistingRental = rentals.some((rental: any) => {
                const rentalStartDate = new Date(rental.startDate);
                const rentalEndDate = new Date(rental.endDate);
                const selectedStartDate = new Date(startDate);
                const selectedEndDate = new Date(endDate);

                return (
                    (selectedStartDate >= rentalStartDate && selectedStartDate <= rentalEndDate) ||
                    (selectedEndDate >= rentalStartDate && selectedEndDate <= rentalEndDate)
                );
            });

            if (hasExistingRental) {
                toast.error('Seçilen tarihler arasında mevcut bir kiralama var. Lütfen farklı tarihler seçiniz.');
                return;
            }

            navigate('/paymentDetail');
        } catch (error) {
            console.error('Error while fetching rental data:', error);
            toast.error('Kiralama verileri alınırken bir hata oluştu.');
        }
    };

    const handleApplyFilters = () => {
        setState(prevState => ({ ...prevState, applyFilter: !prevState.applyFilter }));
    };
    return (
        <div className="available">
            <Filter />
            <button onClick={handleApplyFilters}>Apply Filters</button>
            <header>
                <div className="mnu">
                <FetchAvailableCars
                        key={state.applyFilter.toString()}
                        startDate={rental.startDate}
                        endDate={rental.endDate}
                        locationId={rental.locationId}
                        category={filter.category}
                        minPrice={filter.minPrice}
                        maxPrice={filter.maxPrice}
                        setState={setState}
                    />
                </div>
            </header>
            <Grid container spacing={2}>
                {state.cars.map((car)  => (
                    <Grid item key={car.id} xs={12} sm={6} md={4} lg={3}>
                        <Card sx={{ maxWidth: 345, m: 2 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={car?.imageUrl}
                                alt={`Car Image - ${car.imageUrl}`}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {car.modelYear} {car.brandName} {car.modelName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Plate: {car.plate}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <LocalGasStationIcon /> {car.fuelType}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <DirectionsCarIcon /> {car.transmissionType}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <FormatPaintIcon /> {car.colorName}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => handleRentButtonClick(car.id)}>
                                    {car.dailyPrice}₺ Kiralama Yap
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default AvailableCars;
