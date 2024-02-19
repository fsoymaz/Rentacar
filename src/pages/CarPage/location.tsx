// LocationSelect.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

interface Location {
    id: number;
    name: string;
}

interface LocationSelectProps {
    value: number;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    locations: Location[];
}

const LocationSelect: React.FC<LocationSelectProps> = ({ value, onChange, locations }) => {
    return (
        <label>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> {' '}
            <select value={value} onChange={onChange}>
                {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                        {location.name}
                    </option>
                ))}
            </select>
        </label>
    );
};

export default LocationSelect;
