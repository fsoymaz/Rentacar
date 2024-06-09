import { useState } from 'react';
import { BrandModel } from '../../../models/brandModels/GetAllBrandModel';

const ITEMS_PER_PAGE = 10;

const BrandTable = ({ data }: { data: BrandModel[] }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Marka</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((brand: BrandModel, index) => (
            <tr key={brand.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td>{brand.id}</td>
              <td>{brand.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button key={page} onClick={() => handleChangePage(page)}>
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BrandTable;