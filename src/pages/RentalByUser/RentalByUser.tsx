import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import rentalService from '../../service/baseSevice/rentalService';


const RentalByUser = () => {
    const auth = useSelector((state: any) => state.auth);
    const [rentals, setRentals] = useState<any[]>([]); // Rental türünden bir dizi olarak tanımlayın

    const fetchRentals = async () => {
        try {
            const response:any = await rentalService.getRentalUser(auth.email);
            setRentals(response.data);
            console.log(response)
        } catch (error) {
            console.log(error);
            // Hata durumunu kullanıcıya bildirin
        }
    };

    useEffect(() => {
        fetchRentals();
    }, [auth.email]); // Bağımlılık listesine auth.email'i ekleyin

    return (
        <div>


            {rentals.length > 0 ? (
                rentals.map((rental:any, index) => (
                    <div key={index}>
                        {rental.startDate} {' '}
                        {rental.endDate}
                    </div>
                ))) :(
                <div>No rentals found</div>)}
        </div>
    );
};

export default RentalByUser;
