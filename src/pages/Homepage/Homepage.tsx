import React from 'react';
import { useNavigate } from 'react-router-dom'; // Doğru import
import {Row, Col} from 'react-bootstrap';
import SliderComp from '../../components/SliderComp/SliderComp';
import Header from '../../components/Header/Header';
import RentACarForm from '../../components/RentacarForm/RentacarForm';
import { useDispatch } from 'react-redux';
import { log } from 'console';
import { logoutRental } from '../../store/rental/rentalSlice';

const Homepage: React.FC = () => {
  localStorage.setItem("navi", "/");
  const dispatch = useDispatch();
  return (
    <div>
      <Header
        backgroundImage="/img/home.png"
        title= "Araç Kiralama Şirketimize Hoş Geldiniz"
        description="Muhteşem Araba Koleksiyonumuzu Keşfedin"
        scrollTo='formik-form'
      />
      <Row className="justify-content-md-center">
        <Col id='formik-form' md={8}>
      <RentACarForm />        
        </Col>
      </Row>
      <Col md={12}>
      <SliderComp />
      </Col>
    </div>
  );
};

export default Homepage;
