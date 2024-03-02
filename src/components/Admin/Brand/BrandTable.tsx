import { BrandModel } from '../../../models/brandModels/GetAllBrandModel';
import { GetAllCarResponse } from '../../../models/cars/response/getAllCarResponse';

const BrandTable = ({ data }: { data: BrandModel[] }) => {
  return (
    <table>
      <thead>
        {/* Table Header Rows */}
        <tr>
          <th>ID</th>       
          <th>Marka</th>
        </tr>
      </thead>
      <tbody>
        {data.map((brand: BrandModel, index) => (
          <tr key={brand.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
            <td>{brand.id}</td>
            <td>{brand.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BrandTable;