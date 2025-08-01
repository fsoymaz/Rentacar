import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGasPump, 
  faCar, 
  faPalette, 
  faRoad,
  faCalendarAlt,
  faArrowRight,
  faFilter,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import Filter from './filter';
import { GetAllCarResponse } from '../../models/cars/response/getAllCarResponse';
import { handleCarId, selectRental } from '../../store/rental/rentalSlice';
import { RootState } from '../../store/configureStore';
import rentalService from '../../service/baseSevice/rentalService';
import FetchAvailableCars from '../../components/Fetch/FetchAvailableCars';
import { toast } from 'react-toastify';
import { selectFilter } from '../../store/filter/filterSlice';
import BaseFetcher from '../../components/Fetch/BaseFetcher';
import carService from '../../service/baseSevice/carService';
import './Car.scss';

const AvailableCars: React.FC = () => {
    const initialState = {
        cars: [] as GetAllCarResponse[],
        loading: true,
        error: null as string | null
    };

    const [state, setState] = useState(initialState);
    const [showFilters, setShowFilters] = useState(false);
    
    const rental = useSelector(selectRental);
    const filter = useSelector(selectFilter);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const userEmail = useSelector((state: RootState) => state.auth.email);

    const handleRentButtonClick = async (carId: number) => {
        try {
            dispatch(handleCarId(carId));
            
            if (!rental.startDate || !rental.endDate) {
                toast.warning('Lütfen önce tarih aralığı seçiniz');
                navigate('/');
                return;
            }

            if (!isAuthenticated) {
                localStorage.setItem('navi', '/availableCars');
                navigate('/login');
                return;
            }

            // Check for existing rentals
            try {
                const rentalResponse = await rentalService.getRentalUser(userEmail);
                const rentals = rentalResponse.data;

                const hasExistingRental = rentals.some((existingRental: any) => {
                    const rentalStartDate = new Date(existingRental.startDate);
                    const rentalEndDate = new Date(existingRental.endDate);
                    const selectedStartDate = new Date(rental.startDate);
                    const selectedEndDate = new Date(rental.endDate);

                    return (
                        (selectedStartDate >= rentalStartDate && selectedStartDate <= rentalEndDate) ||
                        (selectedEndDate >= rentalStartDate && selectedEndDate <= rentalEndDate)
                    );
                });

                if (hasExistingRental) {
                    toast.error('Seçilen tarihler arasında mevcut bir kiralama var. Lütfen farklı tarihler seçiniz.');
                    return;
                }
            } catch (error) {
                console.error('Error checking existing rentals:', error);
            }

            navigate('/rental-details');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Bir hata oluştu');
        }
    };

    const getCategoryBadge = (category: string) => {
        const badges = {
            'ECONOMY': { variant: 'success', text: 'Ekonomik' },
            'COMFORT': { variant: 'primary', text: 'Konfor' },
            'LUXURY': { variant: 'warning', text: 'Lüks' },
            'SUV': { variant: 'info', text: 'SUV' }
        };
        
        return badges[category as keyof typeof badges] || { variant: 'secondary', text: category };
    };

    const LoadingSkeleton = () => (
        <div className="car-grid-loading">
            {[...Array(8)].map((_, index) => (
                <div key={index} className="car-card-skeleton">
                    <div className="skeleton-image"></div>
                    <div className="skeleton-content">
                        <div className="skeleton-line title"></div>
                        <div className="skeleton-line medium"></div>
                        <div className="skeleton-line short"></div>
                        <div className="skeleton-line medium"></div>
                        <div className="skeleton-line short"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    const NoCarsFound = () => (
        <div className="no-cars-found">
            <div className="no-cars-icon">
                <FontAwesomeIcon icon={faSearch} />
            </div>
            <h3>Araç Bulunamadı</h3>
            <p>Aradığınız kriterlere uygun araç bulunamadı. Lütfen filtreleri değiştirerek tekrar deneyin.</p>
            <Button 
                className="try-again-button"
                onClick={() => window.location.reload()}
            >
                Filtreleri Sıfırla
            </Button>
        </div>
    );

    return (
        <div className="car-page">
            {/* Header Section */}
            <section className="car-listing-header">
                <Container>
                    <div className="header-content">
                        <h1>Araç Kiralama</h1>
                        <p>Premium araç filoumuzdan size en uygun aracı seçin</p>
                    </div>
                </Container>
            </section>

            <Container>
                {/* Filters Section */}
                <div className="car-filters">
                    <div className="filter-title">
                        <FontAwesomeIcon icon={faFilter} />
                        Araç Filtreleri
                        <Button 
                            variant="outline-primary" 
                            size="sm" 
                            className="ms-auto d-md-none"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            {showFilters ? 'Gizle' : 'Göster'}
                        </Button>
                    </div>
                    
                    <div className={`filter-content ${showFilters ? 'd-block' : 'd-none d-md-block'}`}>
                        <FetchAvailableCars 
                            startDate={rental.startDate}
                            endDate={rental.endDate}
                            locationId={rental.locationId}
                            category={filter.category}
                            minPrice={filter.minPrice}
                            maxPrice={filter.maxPrice}
                            setState={setState}
                        />
                        <Filter />
                    </div>
                </div>

                {/* Cars Grid */}
                {state.loading ? (
                    <LoadingSkeleton />
                ) : state.error ? (
                    <div className="alert alert-danger" role="alert">
                        <h4>Hata!</h4>
                        <p>{state.error}</p>
                    </div>
                ) : state.cars.length === 0 ? (
                    <NoCarsFound />
                ) : (
                    <Row className="g-4 car-grid">
                        {state.cars.map((car) => (
                            <Col key={car.id} xs={12} sm={6} lg={4} xl={3}>
                                <Card className="car-card h-100">
                                    <div className="car-image">
                                        <img
                                            src={car?.imageUrl || '/placeholder-car.jpg'}
                                            alt={`${car.brandName} ${car.modelName}`}
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = '/placeholder-car.jpg';
                                            }}
                                        />
                                        <div className="car-overlay"></div>
                                        <Badge className="car-badge">
                                            {getCategoryBadge(car.category || '').text}
                                        </Badge>
                                    </div>
                                    
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title className="car-title">
                                            {car.modelYear} {car.brandName} {car.modelName}
                                        </Card.Title>
                                        
                                        <div className="car-details">
                                            <div className="detail-item">
                                                <FontAwesomeIcon icon={faRoad} />
                                                <span>Plaka: {car.plate}</span>
                                            </div>
                                            <div className="detail-item">
                                                <FontAwesomeIcon icon={faGasPump} />
                                                <span>{car.fuelType}</span>
                                            </div>
                                            <div className="detail-item">
                                                <FontAwesomeIcon icon={faCar} />
                                                <span>{car.transmissionType}</span>
                                            </div>
                                            <div className="detail-item">
                                                <FontAwesomeIcon icon={faPalette} />
                                                <span>{car.colorName}</span>
                                            </div>
                                            <div className="detail-item">
                                                <FontAwesomeIcon icon={faCalendarAlt} />
                                                <span>{car.modelYear} Model</span>
                                            </div>
                                        </div>
                                        
                                        <div className="car-price-section mt-auto">
                                            <div className="price-info">
                                                <div className="price-amount">
                                                    {car.dailyPrice}₺
                                                </div>
                                                <div className="price-period">
                                                    /günlük
                                                </div>
                                            </div>
                                            <Button 
                                                className="rent-button"
                                                onClick={() => handleRentButtonClick(car.id)}
                                            >
                                                Kirala
                                                <FontAwesomeIcon icon={faArrowRight} />
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}

                {/* Results Summary */}
                {!state.loading && !state.error && state.cars.length > 0 && (
                    <div className="results-summary mt-5 text-center">
                        <p className="text-muted">
                            Toplam <strong>{state.cars.length}</strong> araç listeleniyor
                        </p>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default AvailableCars;
