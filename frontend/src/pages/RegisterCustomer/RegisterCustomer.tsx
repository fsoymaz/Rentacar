import { Formik, Form } from 'formik';
import FormikInput from "../../components/FormikInput/FormikInput";
import React from 'react';
import * as Yup from "yup";
import axios from 'axios';
import { registerSchema } from '../../components/validationSchemas/validationSchemas';
import { toast } from 'react-toastify';
import { addRegister } from '../../models/auth/addRegister';
import authService from '../../service/authService/AuthService';
import './Register.css'
import { useNavigate } from 'react-router-dom';

type Props = {}

const initialValues: addRegister = {
  firstName: "",
  lastName: "",
  email: "",
  birthDate: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const RegisterCustomer = (props: Props) => {
  const navigate = useNavigate();
  return (
    <section className="mt-5 bg-light p-md-4 p-xl-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 p-0">
            <img src="https://www.chandigarhhelp.com/wp-content/uploads/2021/12/Top-Car-Rentals-in-Mohali.png" alt="Açıklama" className="img-fluid w-100 h-100"/> {/* Buraya resmin URL'ini ekleyin */}
          </div>
          <div className="col-md-6">
            <Formik
              initialValues={initialValues}
              onSubmit={async (values: addRegister, { resetForm }) => {
                try {
                  const response = await authService.register(values);
                  if (response.status === 200) {
                    console.log('KULLANICI başarıyla eklendi:', response.data);
                    toast.success('KULLANICI başarıyla eklendi!');
                    resetForm();
                    navigate('/');
                    
                  } else {
                    throw new Error("Kayıt başarısız");
                  }
                } catch (error:any) {
                 
                  if (error.response && error.response.data && error.response.data.message) {
                    toast.error(error.response.data.message);
                  } else {
                    toast.error('Kullanıan mail addresi veya kullanıcı adı sitemde mevcut.');
                  }
                }
              }}
              validationSchema={registerSchema}
            >
              <Form className="p-3 rounded h-100">
                <FormikInput label="Ad" name="firstName" type='text' placeholder='Adınız'/>
                <FormikInput label="Soyad" name="lastName" type='text' placeholder='Soyadınız'/>
                <FormikInput label="E-posta" name="email" type='email' placeholder='E-posta'/>
                <FormikInput label="Doğum Tarihi" name="birthDate" type='date' placeholder='Doğum Tarihi'/>
                <FormikInput label="Kullanıcı Adı" name="username" type='text' placeholder='Kullanıcı Adı'/>
                <FormikInput label="Şifre" name="password" type='password' placeholder='Şifre'/>
                <FormikInput label="Şifreyi Onayla" name="confirmPassword" type='password' placeholder='Şifreyi Onayla'/>
                <button type="submit" className="btn btn-primary mt-3">Gönder</button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RegisterCustomer;
