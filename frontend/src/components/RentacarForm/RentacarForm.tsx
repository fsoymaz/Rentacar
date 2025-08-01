import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faCalendarAlt, 
  faArrowRight,
  faCar,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import { handleEndDate, handleStartDate, selectRental, handleLocationId } from '../../store/rental/rentalSlice';
import carService from '../../service/baseSevice/carService';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { locationModels } from '../../models/locations/locationModels';
import BaseFetcher from '../Fetch/BaseFetcher';
import locationService from '../../service/baseSevice/locationService';
import rentalService from '../../service/baseSevice/rentalService';
import './RentACarForm.scss';

const RentACarForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { startDate, endDate, locationId } = useSelector(selectRental);
  const [pickupDate, setPickupDate] = useState<string>(startDate);
  const [deliveryDate, setDeliveryDate] = useState<string>(endDate);
  const [locations, setLocations] = useState<locationModels[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<number | undefined>(locationId);
  const [isLoading, setIsLoading] = useState(false);
  const authState = useSelector((store: any) => store.auth.email);
  const today = new Date().toISOString().split('T')[0];
  
  const RentACarFormSchema = Yup.object().shape({
    pickupDate: Yup.date().min(today, 'Teslim alma tarihi bugün veya daha sonra olmalıdır').required('Teslim alma tarihi gereklidir'),
    deliveryDate: Yup.date().min(Yup.ref('pickupDate'), 'Teslimat tarihi teslim alma tarihinden sonra olmalıdır').required('Teslim tarihi gereklidir'),
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      if (!pickupDate || !deliveryDate) {
        toast.error('Lütfen teslim alma ve teslim etme tarihlerini seçin');
        return;
      }
      if (!selectedLocation) {
        toast.error('Lütfen bir konum seçin');
        return;
      }
      
      await RentACarFormSchema.validate({ pickupDate, deliveryDate });
      
      // Check for existing rentals if user is authenticated
      if (authState) {
        try {
          const rentalResponse = await rentalService.getRentalUser(authState);
          const rentals = rentalResponse.data;

          const hasExistingRental = rentals.some((rental: any) => {
            const rentalStartDate = new Date(rental.startDate);
            const rentalEndDate = new Date(rental.endDate);
            const selectedStartDate = new Date(pickupDate);
            const selectedEndDate = new Date(deliveryDate);
            return (selectedStartDate >= rentalStartDate && selectedStartDate <= rentalEndDate) || 
                   (selectedEndDate >= rentalStartDate && selectedEndDate <= rentalEndDate);
          });

          if (hasExistingRental) {
            toast.error('Seçilen tarihler arasında mevcut bir kiralama var. Lütfen farklı tarihler seçiniz.');
            return;
          }
        } catch (error) {
          console.error('Error checking existing rentals:', error);
        }
      }

      const response = await carService.getAvailableCars(pickupDate, deliveryDate, selectedLocation);
      dispatch(handleLocationId(selectedLocation));
      navigate(`/availableCars`);
    } catch (error) {
      toast.error('Lütfen alış tarihi ve dönüş tarihini doğru seçiniz.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPickupDate(value);
    dispatch(handleStartDate(value));
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setDeliveryDate(value);
    dispatch(handleEndDate(value));
  };

  const calculateDayDifference = () => {
    if (pickupDate && deliveryDate) {
      const start = new Date(pickupDate);
      const end = new Date(deliveryDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  return (
    <div className="rental-form-container">
      <Card className="rental-form-card">
        <Card.Body>
          <div className="form-header">
            <div className="form-icon">
              <FontAwesomeIcon icon={faCar} />
            </div>
            <h3 className="form-title">Araç Kiralama Formu</h3>
            <p className="form-subtitle">
              Hızlı ve kolay rezervasyon yapın
            </p>
          </div>

          <Form onSubmit={handleSubmit} className="rental-form">
            <BaseFetcher service={() => locationService.getAll()} onBaseFetched={setLocations} />
            
            {/* Location Selection */}
            <div className="form-group">
              <Form.Label className="form-label">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                Teslim Alma Lokasyonu
              </Form.Label>
              <Form.Select
                className="form-control-custom"
                value={selectedLocation || ''}
                onChange={(e) => {
                  const locationId = parseInt(e.target.value);
                  setSelectedLocation(locationId);
                }}
                required
              >
                <option value="">Lokasyon Seçiniz</option>
                {locations.map(location => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </Form.Select>
            </div>

            {/* Date Selection */}
            <Row className="g-3">
              <Col md={6}>
                <div className="form-group">
                  <Form.Label className="form-label">
                    <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                    Alış Tarihi
                  </Form.Label>
                  <Form.Control
                    type="date"
                    className="form-control-custom"
                    value={pickupDate}
                    onChange={handleStartDateChange}
                    min={today}
                    required
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="form-group">
                  <Form.Label className="form-label">
                    <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                    Dönüş Tarihi
                  </Form.Label>
                  <Form.Control
                    type="date"
                    className="form-control-custom"
                    value={deliveryDate}
                    onChange={handleEndDateChange}
                    min={pickupDate || today}
                    required
                  />
                </div>
              </Col>
            </Row>

            {/* Rental Duration Display */}
            {pickupDate && deliveryDate && calculateDayDifference() > 0 && (
              <div className="rental-duration">
                <div className="duration-info">
                  <span className="duration-label">Kiralama Süresi:</span>
                  <span className="duration-value">{calculateDayDifference()} Gün</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="form-actions">
              <Button 
                type="submit" 
                className="rental-submit-btn"
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? (
                  <>
                    <div className="spinner-border spinner-border-sm me-2" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    Aranıyor...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faSearch} className="me-2" />
                    Müsait Araçları Bul
                    <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                  </>
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default RentACarForm;
