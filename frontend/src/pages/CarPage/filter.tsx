import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Category } from '../../Enum/CategoryEnum';
import './Car.css';
import {
    selectFilter,
    setCategory,
    setMaxPrice,
    setMinPrice,
} from '../../store/filter/filterSlice';
import { BrandModel } from '../../models/brandModels/GetAllBrandModel';
import brandService from '../../service/baseSevice/brandService';
import modelService from '../../service/baseSevice/modelService';
import locationService from '../../service/baseSevice/locationService';
import { modelModels } from '../../models/modelModels/GetAllModelsModel';
import BaseFetcher from '../../components/Fetch/BaseFetcher';
import { handleEndDate, handleLocationId, handleStartDate, selectRental } from '../../store/rental/rentalSlice';

const Filter = () => {
    const dispatch = useDispatch();
    const [brands, setBrands] = useState<BrandModel[]>([]);
    const [models, setModels] = useState<modelModels[]>([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [locations, setLocations] = useState<{ id: number; name: string }[]>([]);
    const {
        category,
        minPrice,
        maxPrice,
    } = useSelector(selectFilter);

    const rental = useSelector(selectRental);
    const { startDate, endDate, locationId } = rental;
    const safeMinPrice = minPrice !== null ? minPrice.toString() : '';
    const safeMaxPrice = maxPrice !== null ? maxPrice.toString() : '';

    return (
        <div>

            <BaseFetcher service={() => brandService.getAll()} onBaseFetched={setBrands} />
            <BaseFetcher service={() => modelService.getAll()} onBaseFetched={setModels} />
            <BaseFetcher service={() => locationService.getAll()} onBaseFetched={setLocations} />
            <div className="filter-item">
                <label>Location:</label>
                <select value={locationId} onChange={(e) => dispatch(handleLocationId(parseInt(e.target.value)))}>
                    {locations.map(location => (
                        <option key={location.id} value={location.id}>{location.name}</option>
                    ))}
                </select>
            </div>

            <div className="filter-item">
                <label>Category:</label>
                <select value={category} onChange={(e) => dispatch(setCategory(e.target.value))}>
                    <option value="">All</option>
                    <option value={Category.ECONOMY}>Economy</option>
                    <option value={Category.COMFORT}>Comfort</option>
                    <option value={Category.LUXURY}>Luxury</option>
                </select>
            </div>
            <div className="filter-item">
                <label>Brand:</label>
                <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
                    <option value="">All</option>
                    {brands.map(brand => (
                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                    ))}
                </select>
            </div>

            <div className="filter-item">
                <label>Model:</label>
                <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
                    <option value="">All</option>
                    {models.map(model => (
                        <option key={model.id} value={model.id}>{model.name}</option>
                    ))}
                </select>
            </div>

            <div className="filter-item">
                <label>Min Price:</label>
                <input type="number" value={safeMinPrice} onChange={(e) => dispatch(setMinPrice(parseFloat(e.target.value)))} />
            </div>

            <div className="filter-item">
                <label>Max Price:</label>
                <input type="number" value={safeMaxPrice} onChange={(e) => dispatch(setMaxPrice(parseFloat(e.target.value)))} />
            </div>

            <div className="filter-item">
                <label>Pickup Date:</label>
                <input type="date" value={startDate} onChange={(e) => dispatch(handleStartDate(e.target.value))} />
            </div>

            <div className="filter-item">
                <label>Return Date:</label>
                <input type="date" value={endDate} onChange={(e) => dispatch(handleEndDate(e.target.value))} />
            </div>
        </div>
    );
};

export default Filter;
