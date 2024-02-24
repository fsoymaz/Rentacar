import React, { useState, useEffect } from 'react';
import { GetAllCarResponse } from '../../../../models/cars/response/getAllCarResponse';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import '../Admin.css';

type NestedKeysInGetAllCarResponse = keyof GetAllCarResponse | keyof GetAllCarResponse['model'] | 'model.brand' | 'location' | 'color';

const CarTable = ({ cars }: { cars: GetAllCarResponse[] }) => {
  const [filter, setFilter] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{ key: NestedKeysInGetAllCarResponse, direction: 'ascending' | 'descending' } | null>({ key: 'modelYear', direction: 'ascending' });
  const [sortedCars, setSortedCars] = useState<GetAllCarResponse[]>(cars);

  useEffect(() => {
    setSortedCars(cars);
  }, [cars]);

  const categoryTranslations: { [key: string]: string } = {
    economy: 'Ekonomi',
    comfort: 'Konfor',
    luxury: 'Lüks'
  };

  const columnKeys: { [key: string]: NestedKeysInGetAllCarResponse } = {
    'Model Yılı': 'modelYear',
    'Plaka': 'plate',
    'Kredi Notu': 'minFindeksRate',
    'Kilometre': 'kilometer',
    'Günlük Fiyat': 'dailyPrice',
    'Marka': 'model.brand',
    'Model': 'model',
    'Renk': 'color',
    'Vites Tipi': 'transmissionType',
    'Yakıt Tipi': 'fuelType',
    'Kategori': 'category',
    'Lokasyon': 'location'
  };

  const handleSort = (key: NestedKeysInGetAllCarResponse) => {
    let direction: 'ascending' | 'descending' = 'ascending';

    if (sortConfig && sortConfig.key === key) {
      direction = sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    }

    let sortedCars = [...cars]; 
    
    sortedCars.sort((a, b) => {
      let aValue;
      let bValue;

      if (key === 'model.brand') {
        aValue = a.model.brand?.name;
        bValue = b.model.brand?.name;
      } else if (key === 'model') {
        aValue = a.model?.name;
        bValue = b.model?.name;
      } else if (key === 'location') {
        aValue = a.location?.name;
        bValue = b.location?.name;
      } else if (key === 'color') {
        aValue = a.color?.name;
        bValue = b.color?.name;
      } else {
        aValue = a[key as keyof GetAllCarResponse];
        bValue = b[key as keyof GetAllCarResponse];
      }

      if (aValue && bValue) {
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return direction === 'ascending' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          return direction === 'ascending' ? aValue - bValue : bValue - aValue;
        }
      }

      return 0;
    });

    setSortConfig({ key, direction });
    setSortedCars(sortedCars);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilter(value);
    const filteredCars = cars.filter(car => car.plate.includes(value));
    setSortedCars(filteredCars);
  };

  return (
    <table>
      <thead>
        <tr>
          {Object.keys(columnKeys).map((columnName, index) => (
            <th key={index} onClick={() => handleSort(columnKeys[columnName])}>
              {columnName} {sortConfig && sortConfig.key === columnKeys[columnName] && (sortConfig.direction === 'ascending' ? <FaSortAmountDown /> : <FaSortAmountUp />)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedCars.map((car: GetAllCarResponse, index) => (
          <tr key={car.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
            <td>{car.modelYear}</td>
            <td>{car.plate}</td>
            <td>{car.minFindeksRate}</td>
            <td>{car.kilometer}</td>
            <td>{car.dailyPrice}₺</td>
            <td>{car.model.brand?.name}</td>
            <td>{car.model?.name}</td>
            <td>{car.color.name}</td>
            <td>{car.transmissionType}</td>
            <td>{car.fuelType}</td>
            <td className={`category-${car.category.toLowerCase()}`}>{categoryTranslations[car.category.toLowerCase()]}</td>
            <td>{car.location.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CarTable;
