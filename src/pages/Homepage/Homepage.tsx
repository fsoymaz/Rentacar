import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Header from '../../components/Header/Header';
import RentACarForm from '../../components/RentacarForm/RentacarForm';
import { useDispatch } from 'react-redux';
import Campaign from '../../components/Campaign/Campaign';

const Homepage: React.FC = () => {
  localStorage.setItem("navi", "/");
  const dispatch = useDispatch();
  return (
    <div>
      <Header
        backgroundImage="http://res.cloudinary.com/dq6lsgssu/image/upload/v1710254237/55e319a1-fcc9-4f9a-96b0-0953c7232607.png"
        title= "Araç Kiralama Şirketimize Hoş Geldiniz"
        description="Muhteşem Araba Koleksiyonumuzu Keşfedin"
        scrollTo='formik-form'
      />
      <Row className="justify-content-md-center">
        <Col id='formik-form' >
      <RentACarForm />        
        </Col>
      </Row>
      <Campaign />
    </div>
  );
};

export default Homepage;
