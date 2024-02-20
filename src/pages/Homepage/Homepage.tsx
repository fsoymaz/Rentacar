// Homepage.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Doğru import
import {Row, Col} from 'react-bootstrap';
import SliderComp from '../../components/SliderComp/SliderComp';
import './Homepage.css';
import Header from '../../components/Header/Header';
import RentACarForm from '../../components/RentacarForm/RentacarForm';

const Homepage: React.FC = () => {
  const navigate = useNavigate(); // Doğru kullanım
  localStorage.setItem("navi", "/");
  const handleSubmit = (values: any) => {
    navigate(`/availableCars?startDate=${values.pickupDate}&endDate=${values.returnDate}`); // Doğru kullanım
  };
 
  return (
    <div>
      <Header
        backgroundImage="/img/home.png"
        title="Welcome to Our Rent a Car Company"
        description="Explore Our Amazing Car Collection"
        scrollTo='formik-form'
      />
      <div id='formik-form'>
      <Row className="justify-content-md-center">
        <Col className='p-5' md={6}>
      <RentACarForm />        
        </Col>
      </Row>
      </div>
      <SliderComp />
    </div>
  );
};

export default Homepage;
