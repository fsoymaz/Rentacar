import { Category } from '../../Enum/CategoryEnum';
import { BrandModel } from '../../models/brandModels/GetAllBrandModel';
import { modelModels } from '../../models/modelModels/GetAllModelsModel';

interface FilterProps {
    category: string;
    brands: BrandModel[];
    models: modelModels[];
    onCategoryChange: (category: string) => void;
    onBrandChange: (brand: string) => void;
    onModelChange: (model: string) => void;
    onMinPriceChange: (price: number) => void;
    onMaxPriceChange: (price: number) => void;
    onStartDateChange: (date: string) => void; // Alış Tarihi değişikliği için prop
    onEndDateChange: (date: string) => void; // Dönüş Tarihi değişikliği için prop
    onApplyFilters: () => void;
    filterMenuVisible: boolean;
    toggleFilterMenu: () => void;
}

const Filter: React.FC<FilterProps> = ({
    category,
    brands,
    models,
    onCategoryChange,
    onBrandChange,
    onModelChange,
    onMinPriceChange,
    onMaxPriceChange,
    onStartDateChange, // Alış Tarihi değişikliği için prop
    onEndDateChange, // Dönüş Tarihi değişikliği için prop
    onApplyFilters,
    filterMenuVisible,
    toggleFilterMenu,
}) => {
    return (
        <div className={`filter-menu ${filterMenuVisible ? 'active' : ''}`}>
            <div className="filter-item">
                <label>Category:</label>
                <select value={category} onChange={(e) => onCategoryChange(e.target.value)}>
                    <option value={'ALL'}>All</option>
                    <option value={Category.ECONOMY}>Ekonomi</option>
                    <option value={Category.COMFORT}>Comfort</option>
                    <option value={Category.LUXURY}>Luxury</option>
                </select>
            </div>
            <div className="filter-item">
                <label>Brand:</label>
                <select onChange={(e) => onBrandChange(e.target.value)}>
                    <option value="">All</option>
                    {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                            {brand.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="filter-item">
                <label>Model:</label>
                <select onChange={(e) => onModelChange(e.target.value)}>
                    <option value="">All</option>
                    {models.map((model) => (
                        <option key={model.id} value={model.id}>
                            {model.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="filter-item">
                <label>Min Price:</label>
                <input type="number" onChange={(e) => onMinPriceChange(parseFloat(e.target.value))} />
            </div>
            <div className="filter-item">
                <label>Max Price:</label>
                <input type="number" onChange={(e) => onMaxPriceChange(parseFloat(e.target.value))} />
            </div>
            {/* Alış Tarihi için input */}
            <div className="filter-item">
                <label>Alış Tarihi:</label>
                <input type="date" onChange={(e) => onStartDateChange(e.target.value)} />
            </div>
            {/* Dönüş Tarihi için input */}
            <div className="filter-item">
                <label>Dönüş Tarihi:</label>
                <input type="date" onChange={(e) => onEndDateChange(e.target.value)} />
            </div>
            <button className="btn btn-success" onClick={onApplyFilters}>Apply Filters</button>
        </div>
    );
};

export default Filter;
