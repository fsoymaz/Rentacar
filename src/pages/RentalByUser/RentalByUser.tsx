import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import rentalService from '../../service/baseSevice/rentalService';
import './rentaluser.css';

const RentalByUser = () => {
    const auth = useSelector((state: any) => state.auth);
    const [rentals, setRentals] = useState<any[]>([]);
    const [filteredRentals, setFilteredRentals] = useState<any[]>([]);
    const [activeRentals, setActiveRentals] = useState<boolean>(true);

    const formatDateString = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR');
    };

    const fetchRentals = async () => {
        try {
            const response: any = await rentalService.getRentalUser(auth.email);
            setRentals(response.data);
            setFilteredRentals(response.data.filter((rental: any) => new Date(rental.endDate) < new Date() === !activeRentals));
        } catch (error) {
            console.log(error);
        }
    };

    const handleFilter = (isActive: boolean) => {
        setActiveRentals(isActive);
        setFilteredRentals(rentals.filter((rental: any) => new Date(rental.endDate) < new Date() === !isActive));
    };

    useEffect(() => {
        fetchRentals();
    }, [auth.email]);

    return (
        <div >
            <div>
                <div className="mb-1">
                <button className="btn btn-success btn-rounded" data-mdb-ripple-init  onClick={() => handleFilter(true)}>Aktif Kiramalarım</button>
                {'  '} 
            
                <button type="button" className="btn btn-danger btn-rounded" data-mdb-ripple-init onClick={() => handleFilter(false)}>Geçmiş Kiralamalarım</button>
              
                </div>
                {filteredRentals.length > 0 ? (
                    <div className="row">
                        {filteredRentals.map((rental: any, index) => (
                            <div key={index} className="col-lg-4 mb-4 mb-sm-2">
                                <div className={`card card-style1 border-0`}>
                                    <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                                        <div className="row align-items-center">
                                            <div className="col-lg-6 mb-4 mb-lg-0">
                                                <img src={rental.carResponse.imagePath} alt="..." />
                                            </div>
                                            <div className="col-lg-6 px-xl-10">
                                                <div className="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                                                    <h2 className="h4 text-white mb-0">
                                                        {rental.carResponse.model.brand.name}{" "}
                                                        {rental.carResponse.model.name}
                                                    </h2>
                                                </div>
                                                <ul className="list-unstyled mb-1-9">
                                                    <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Plaka:</span> {rental.carResponse.plate}</li>
                                                    <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Alış Trh:</span>{formatDateString(rental.startDate)}</li>
                                                    <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Teslim Trh:</span>{formatDateString(rental.endDate)}</li>
                                                    <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Lokasyon:</span>{rental.carResponse.location.name}</li>
                                                    <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Toplam Tutar:</span>{rental.totalPrice+"₺"}</li>
                                                    <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Kiralama Durumu:</span><span className={`circle ${new Date(rental.endDate) < new Date() ? 'past-rental' : 'active-rental'}`}></span>{new Date(rental.endDate) < new Date() ? 'Geçmiş' : 'Aktif'}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>Kiralama Bulunamadı</div>
                )}
            </div>
        </div>
    );
};

export default RentalByUser;
