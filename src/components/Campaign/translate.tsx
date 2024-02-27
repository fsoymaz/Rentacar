const translate = (data: any) => {
    switch (data) {
        case 'AUTOMATIC':
            return 'Otomatik';
        case 'MANUAL':
            return 'Manuel';
        case 'DIESEL':
            return 'Dizel';
        case 'GASOLINE':
            return 'Benzin';
        case 'ELECTRIC':
            return 'Elektrikli';
        case 'HYBRID':
            return 'Hibrit';
        case 'ECONOMY':
            return 'Ekonomik';
        case 'LUXURY':
            return 'Lüks';
        case 'COMFORT':
            return 'Konfor';
    }
};


export default translate;