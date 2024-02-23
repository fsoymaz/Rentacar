import { GetAllCarResponse } from '../../../../models/cars/response/getAllCarResponse';

const CarTable = ({ cars }: { cars: GetAllCarResponse[] }) => {
  return (
    <table>
      <thead>
        {/* Table Header Rows */}
        <tr>
          <th>ID</th>
          <th>Model Year</th>
          <th>Plate</th>
          <th>Min Findeks Rate</th>
          <th>Kilometer</th>
          <th>Daily Price</th>
          <th>Model Brand</th>
          <th>Model Name</th>
          <th>Color</th>
          <th>Transmission Type</th>
          <th>Fuel Type</th>
          <th>Category</th>
          <th>Passenger Capacity</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {cars.map((car: GetAllCarResponse) => (
          <tr key={car.id}>
            <td>{car.id}</td>
            <td>{car.modelYear}</td>
            <td>{car.plate}</td>
            <td>{car.minFindeksRate}</td>
            <td>{car.kilometer}</td>
            <td>{car.dailyPrice}</td>
            <td>{car.model.brand?.name}</td>
            <td>{car.model.name}</td>
            <td>{car.color.name}</td>
            <td>{car.transmissionType}</td>
            <td>{car.fuelType}</td>
            <td>{car.category}</td>
            <td>{car.passengerCapacity}</td>
            <td>{car.location.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CarTable;