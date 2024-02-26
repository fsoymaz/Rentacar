import React from 'react';
import { Category } from '../../Enum/CategoryEnum';
import { BrandModel } from '../../models/brandModels/GetAllBrandModel';
import { modelModels } from '../../models/modelModels/GetAllModelsModel';
import './Car.css';
interface FilterProps {
    category: string;
    brands: BrandModel[];
    models: modelModels[];
    onCategoryChange: (category: string) => void;
    onBrandChange: (brand: string) => void;
    onModelChange: (model: string) => void;
    onMinPriceChange: (price: number) => void;
    onMaxPriceChange: (price: number) => void;
    onStartDateChange: (date: string) => void;
    onEndDateChange: (date: string) => void;
    onApplyFilters: () => void;
    filterMenuVisible: boolean;
    toggleFilterMenu: () => void;
    locationId: number;
    onLocationChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    locations: { id: number; name: string }[];
}

const Filter: React.FC<FilterProps> = ({
    locationId,
    onLocationChange,
    locations,
    category,
    brands,
    models,
    onCategoryChange,
    onBrandChange,
    onModelChange,
    onMinPriceChange,
    onMaxPriceChange,
    onStartDateChange,
    onEndDateChange,
    filterMenuVisible,
}) => (
    <div className={`filter-menu ${filterMenuVisible ? 'active' : ''}`}>
        <div className="filter-item">
            <label>Location:</label>
            <select value={locationId} onChange={onLocationChange}>
                {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                        {location.name}
                    </option>
                ))}
            </select>
        </div>
        <div className="filter-item">

            <label>Ketegory:</label>
            <select value={category} onChange={(e) => onCategoryChange(e.target.value)}>
                <option value={""}>Hepsi</option>
                <option value={Category.ECONOMY}>Ekonomi</option>
                <option value={Category.COMFORT}>Konfor</option>
                <option value={Category.LUXURY}>Lüks</option>
            </select>
        </div>
        <div className="filter-item">
            <label>Marka:</label>
            <select onChange={(e) => onBrandChange(e.target.value)}>
                <option value="">Hepsi</option>
                {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                ))}
            </select>
        </div>
        <div className="filter-item">
            <label>Model:</label>
            <select onChange={(e) => onModelChange(e.target.value)}>
                <option value="">Hepsi</option>
                {models.map((model) => (
                    <option key={model.id} value={model.id}>{model.name}</option>
                ))}
            </select>
        </div>
        <div className="filter-item">
            <label>Min Fiyat:</label>
            <input type="number" onChange={(e) => onMinPriceChange(parseFloat(e.target.value))} />
        </div>
        <div className="filter-item">
            <label>Max Fiyat:</label>
            <input type="number" onChange={(e) => onMaxPriceChange(parseFloat(e.target.value))} />
        </div>
        <div className="filter-item">
            <label>Alış Tarihi:</label>
            <input type="date" onChange={(e) => onStartDateChange(e.target.value)} />
        </div>
        <div className="filter-item">
            <label>Dönüş Tarihi:</label>
            <input type="date" onChange={(e) => onEndDateChange(e.target.value)} />
        </div>
    </div>
);

export default Filter;