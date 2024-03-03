import React, { ReactElement, useEffect } from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import Navbar from './components/Navbar/Navbar';
import Homepage from './pages/Homepage/Homepage';
import 'react-slideshow-image/dist/styles.css'
import CustomFooter from './components/Footer/Footer';
import About from './pages/About/About';
import Admin from './pages/Admin/Admin';
import AddCar from './components/Admin/Car/AddCar';
import AddModel from './pages/Admin/AdminPages/AddModel';
import Sidebar from './components/Sidebar/Sidebar';
import { ToastContainer } from 'react-toastify';
import ContactUs from './pages/Contact/Contact';
import RegisterCustomer from './pages/RegisterCustomer/RegisterCustomer';
import LoginForm from './pages/Login/login';
import Profile from './pages/Profile/Profile';
import AvailableCars from './pages/CarPage/availableCars';
import CategoryCars from './pages/CarPage/CategoryCars';
import Cars from './pages/CarPage/CarsPage';
import CreditCardForm from './pages/card/CreditCardForm';
import { useSelector } from 'react-redux';
import AdminRoute from './contexts/AdminRoute';
import UserRoute from './contexts/UserRoute';
import RentalDetail from './pages/RentalDetails/RentalDetails';
import Succsess from './pages/Success/Success';
import Car from './pages/Admin/AdminPages/AdminCarPage/Car';
import RentalByUser from './pages/RentalByUser/RentalByUser';
import AdminBrand from './pages/Admin/AdminPages/AddBrandPage/AdminBrand';
import PrivateRoute from './contexts/PrivateRoute';
import CampaignCarsPage from './pages/CarPage/CampaignCarsPage';
import AdminModel from './pages/Admin/AdminModelPage/AdminModel';

function App(): ReactElement {
  const isOnAdminPage = window.location.pathname.indexOf('/admin') === 0;
  const location = useLocation();
  const auth = useSelector((state: any) => state.auth);

  useEffect(() => {
    window.scrollTo(0, 0); // Sayfanın en üstüne scroll yap
  }, [location.pathname]); // Konum değiştiğinde çalış

  return (
    <div className='App'>
      <ToastContainer position="bottom-right" autoClose={3000} />
      {!isOnAdminPage && <Navbar />}
      <div className="content-wrapper">
        {isOnAdminPage && <Sidebar />}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/cars/category" element={<CategoryCars />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
          <Route path="/admin/addBrand" element={<AdminRoute><AdminBrand /></AdminRoute>} />
          <Route path="/admin/addModel" element={<AdminRoute><AdminModel /></AdminRoute>} />
          <Route path="/admin/admincar" element={<AdminRoute><Car /></AdminRoute>} />

          <Route path="/register" element={<RegisterCustomer />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/availableCars" element={<AvailableCars />} />
          <Route path="/card" element={<UserRoute><CreditCardForm /></UserRoute>} />
          <Route path="/paymentDetail" element={<PrivateRoute><RentalDetail /> </PrivateRoute>} />
          <Route path="/invoice" element={<UserRoute><Succsess /></UserRoute>} />
          <Route path="/userRentals" element={<PrivateRoute><RentalByUser /></PrivateRoute>} />
          <Route path="/campainCar" element={<CampaignCarsPage />} />
          <Route path="*" element={<div>Hata: Bu sayfa bulunamadı!</div>} />
        </Routes>
      </div>
      {!isOnAdminPage && <CustomFooter />}
    </div>
  )
}

export default App;
