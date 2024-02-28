import { useEffect, useState } from "react";
import SingleCard from "../../components/SingleCard/SingleCard";
import './Dashboard.css';
import { Col } from "react-bootstrap";
import BaseFetcher from "../../components/Fetch/BaseFetcher";
import carService from "../../service/baseSevice/carService";
import userService from "../../service/baseSevice/userService";
import rentalService from "../../service/baseSevice/rentalService";
import MileChart from "../../components/MileChart/MileChart";

const Admin = () => {
  const [totalCars, setTotalCars] = useState(0);
  const [dailyTrips, setDailyTrips] = useState(0);
  const [totalUser, setTotalUsers] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const today = new Date();
  const day = today.toISOString().split('T')[0];
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const carObj = (title: any, totalNumber: any, icon: any) => ({
    title: title,
    totalNumber: totalNumber,
    icon: icon,
  });
  
  return (
    <Col xs={12} sm={10} className="dashboard col-10 pt-5 sm:col-12">
      <BaseFetcher service={() => carService.getTotalCars()} onBaseFetched={setTotalCars} />
      <BaseFetcher service={(date) => rentalService.getDailyRentals(date)} onBaseFetched={setDailyTrips} params={[day]} />
      <BaseFetcher service={(month, year) => rentalService.getMonthlyIncome(month, year)} onBaseFetched={setMonthlyIncome} params={[month, year]} />
      <BaseFetcher service={() => userService.getUserCount()} onBaseFetched={setTotalUsers} />

      <div className="dashboard__cards">
        <SingleCard item={carObj("Araç Toplamı", totalCars+'+', "ri-police-car-line")} />
        <SingleCard item={carObj("Günlük Sürüş", dailyTrips + '+', "ri-steering-2-line")} />
        <SingleCard item={carObj("Kullanıcı Sayısı", totalUser + '+', "ri-user-line")} />
        <SingleCard item={carObj("Aylık Kazanç", monthlyIncome + '₺', "ri-timer-flash-line")} />
      </div>
      <div className="statics">
        <div className="stats" >
        <h3 className="stats__title "><strong>AY/YIL&nbsp;&nbsp;&nbsp;SATIŞ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;GRAFİĞİ</strong></h3>
          <MileChart />
        </div>
      </div>
    </Col >
  );
};

export default Admin;
