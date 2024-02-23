import { Option } from "../components/GenerateOptions/GenerateOptions";

export const getFormikInfo = (
    models?: Option[],
    colors?: Option[],
    locations?: Option[],
    transmissionTypeOptions?: Option[],
    fuelTypeOptions?: Option[],
    categoryOptions?: Option[],
    isUpdate?: boolean
) => {
    const initialOption: any = { id: 'initial-option', value: 0, name: 'Lütfen bir Seçim yapınız', label: 'Seçiniz' };
    const formikInfo = [
        { formikType: "FormikInput", label: "Model Year", name: "modelYear", type: "number", placeholder: "Model Year giriniz" },
        { formikType: "FormikInput", label: "Plate", name: "plate", type: "string", placeholder: "Plate giriniz" },
        { formikType: "FormikInput", label: "Min Findeks Rate", name: "minFindeksRate", type: "number", placeholder: "Min Findeks Rate giriniz" },
        { formikType: "FormikInput", label: "Kilometer", name: "kilometer", type: "number", placeholder: "Kilometre giriniz" },
        { formikType: "FormikInput", label: "Daily Price", name: "dailyPrice", type: "number", placeholder: "Daily Price giriniz" },
        { formikType: "FormikSelect", label: "Transmission Type", name: "transmissionType", options: transmissionTypeOptions ? [initialOption, ...transmissionTypeOptions] : [] },
        { formikType: "FormikSelect", label: "Fuel Type", name: "fuelType", options: fuelTypeOptions ? [initialOption, ...fuelTypeOptions] : [] },
        { formikType: "FormikSelect", label: "Category", name: "category", options: categoryOptions ? [initialOption, ...categoryOptions] : [] },
        { formikType: "FormikInput", label: "Passenger Capacity", name: "passengerCapacity", type: "number", placeholder: "Passenger Capacity giriniz" },
    ];

    if (isUpdate) {
        formikInfo.unshift({ formikType: "FormikInput", label: "ID", name: "id", type: "number", placeholder: "ID giriniz" });
        formikInfo.push({ formikType: "FormikInput", label: "Image Path", name: "imagePath", type: "string", placeholder: "Image Path giriniz" });
    } else {
        formikInfo.push(
            { formikType: "FormikSelect", label: "Model", name: "modelId", options: models ? [initialOption, ...models] : [] },
            { formikType: "FormikSelect", label: "Color", name: "colorId", options: colors ? [initialOption, ...colors] : [] },
            { formikType: "FormikSelect", label: "Location", name: "locationId", options: locations ? [initialOption, ...locations] : [] }
        );
    }

    return formikInfo;
};