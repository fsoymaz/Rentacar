import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './SliderComp.css';
import carService from '../../service/baseSevice/carService';
import { GetAllCarResponse } from '../../models/cars/response/getAllCarResponse';

type Props = {};

const SliderComp = (props: Props) => {
	const [cars, setCars] = useState<GetAllCarResponse[]>([]);
	const [randomCarIndexes, setRandomCarIndexes] = useState<number[]>([]);

	useEffect(() => {
		fetchCars();
	}, []);
const fetchCars = async () => {
    try {
        const response = await carService.getAll().then((response: any) => {
			setCars(response.data);
			const indexes = Array.from({ length: Math.min(response.data.length, 4) }, () =>
            Math.floor(Math.random() * response.data.length)
        );
        setRandomCarIndexes(indexes);
		  });;
    

       
    } catch (error) {
        console.error('Error fetching cars:', error);
    }
};


	return (
		<div id="slider-section" className="slider-comp-container ">
			<Carousel className="custom-slider">
				{randomCarIndexes.map((index, idx) => (
					<Carousel.Item key={idx} className="slider-item">
						{cars[index] && (
							<div className="slider-item-text">
								<div className="col-md-6">
									<div>
										<h2>
											{cars[index].brandName} {cars[index].modelName}
										</h2>
										<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, delectus?</p>
									</div>
								</div>
								<div className="col-md-6">
									<img src={cars[index].imageUrl} alt={`Car Image - ${cars[index].imageUrl}`} />
								</div>
							</div>
						)}
					</Carousel.Item>
				))}
			</Carousel>
		</div>
	);
};

export default SliderComp;
