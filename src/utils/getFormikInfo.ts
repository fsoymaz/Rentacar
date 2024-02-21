import { Option } from "../components/GenerateOptions/GenerateOptions";
const generateKey = (prefix: string, index: number) => `${prefix}-${index}`;

export const getFormikInfo = (
    models?: Option[],
    colors?: Option[],
    locations?: Option[],
    transmissionTypeOptions?: Option[],
    fuelTypeOptions?: Option[],
    categoryOptions?: Option[],
    isUpdate?: boolean
) => {
    const initialOption: any = { value: '', name: 'Lütfen bir Seçim yapınız', label: 'Seçiniz' };

    const formikInfo = [
        { formikType: "FormikInput", label: "Model Year", name: "modelYear", type: "number", placeholder: "Model Year giriniz", key: generateKey('input', 0) },
        { formikType: "FormikInput", label: "Plate", name: "plate", type: "string", placeholder: "Plate giriniz", key: generateKey('input', 1) },
        { formikType: "FormikInput", label: "Min Findeks Rate", name: "minFindeksRate", type: "number", placeholder: "Min Findeks Rate giriniz", key: generateKey('input', 2) },
        { formikType: "FormikInput", label: "Kilometer", name: "kilometer", type: "number", placeholder: "Kilometre giriniz", key: generateKey('input', 3) },
        { formikType: "FormikInput", label: "Daily Price", name: "dailyPrice", type: "number", placeholder: "Daily Price giriniz", key: generateKey('input', 4) },
        { formikType: "FormikSelect", label: "Transmission Type", name: "transmissionType", options: transmissionTypeOptions ? [initialOption, ...transmissionTypeOptions] : [], key: generateKey('select', 0) },
        { formikType: "FormikSelect", label: "Fuel Type", name: "fuelType", options: fuelTypeOptions ? [initialOption, ...fuelTypeOptions] : [], key: generateKey('select', 1) },
        { formikType: "FormikSelect", label: "Category", name: "category", options: categoryOptions ? [initialOption, ...categoryOptions] : [], key: generateKey('select', 2) },
        { formikType: "FormikInput", label: "Passenger Capacity", name: "passengerCapacity", type: "number", placeholder: "Passenger Capacity giriniz", key: generateKey('input', 5) },
    ];

    if (isUpdate) {
        formikInfo.unshift({ formikType: "FormikInput", label: "ID", name: "id", type: "number", placeholder: "ID giriniz", key: generateKey('input', 6) });
        formikInfo.push({ formikType: "FormikInput", label: "Image Path", name: "imagePath", type: "string", placeholder: "Image Path giriniz", key: generateKey('input', 7) });
    } else {
        formikInfo.push(
            { formikType: "FormikSelect", label: "Model", name: "modelId", options: models ? [initialOption, ...models] : [], key: generateKey('select', 3) },
            { formikType: "FormikSelect", label: "Color", name: "colorId", options: colors ? [initialOption, ...colors] : [], key: generateKey('select', 4) },
            { formikType: "FormikSelect", label: "Location", name: "locationId", options: locations ? [initialOption, ...locations] : [], key: generateKey('select', 5) }
        );
    }

    return formikInfo;
};
