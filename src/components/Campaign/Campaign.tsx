import React, { useEffect, useState } from "react";
import "./Campaign.scss";
import CarBox from "./CarBox";
import axiosInstance from "../../utils/Interceptors";

interface CampaignProps {}

const Campaign: React.FC<CampaignProps> = (
  props: CampaignProps
): JSX.Element => {
  const [active, setActive] = useState<number>(0);
  const [colorBtn, setColorBtn] = useState<number>(0);
  const [data, setData] = useState<any[]>([]);

  const btnID = (id: number) => {
    setColorBtn(colorBtn === id ? 0 : id);
  };

  const coloringButton = (id: number) => {
    return colorBtn === id ? "colored-button" : "";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance("http://localhost:8080/api/cars/discounted");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching campaign cars:", error);
      }
    };

    fetchData();
  }, []); 

  return (
    <>
      <section className="pick-section">
        <div className="container" >
          <div className="pick-container">
            <div className="pick-container__title">
                <h1>Kampanya</h1>
                <h2>Fırsatları Kaçırma!</h2>
                <p>Kampanya kapsamında, seçili araçlarda %20'ye varan indirim fırsatını kaçırma!</p>
            </div>
            <div className="pick-container__car-content">
              <div className="pick-box">
                {data.map((car, index) => (
                  <button
                    key={index}
                    className={`${coloringButton(index + 1)}`}
                    onClick={() => {
                      setActive(index);
                      btnID(index + 1);
                    }}
                  >
                    {car.brandName}   {car.modelName}
                  </button>
                ))}
              </div>

              {active >= 0 && data.length > active && (
                <CarBox data={data[active]} />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Campaign;