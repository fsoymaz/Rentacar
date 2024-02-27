import SingleCard from "../../components/SingleCard/SingleCard";
import './Dashboard.css';
const Admin = () => {


  const carObj = {
    title: "Total Cars",
    totalNumber: 750,
    icon: "ri-police-car-line",
  };
  
  const tripObj = {
    title: "Daily Trips",
    totalNumber: 1697,
    icon: "ri-steering-2-line",
  };
  
  const clientObj = {
    title: "Clients Annually",
    totalNumber: "85k",
    icon: "ri-user-line",
  };
  
  const distanceObj = {
    title: "Kilometers Daily",
    totalNumber: 2167,
    icon: "ri-timer-flash-line",
  };
  

  return (
       <div className="dashboard col-10">
        <div className="dashboard__cards">
          <SingleCard item={carObj} />
          <SingleCard item={tripObj} />
          <SingleCard item={clientObj} />
          <SingleCard item={distanceObj} />
        </div>
    </div>
  );
};

export default Admin;