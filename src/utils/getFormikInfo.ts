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
    const initialOption: any = { value: '', name: 'Lütfen bir Seçim yapınız', label: 'Seçiniz' };

    const formikInfo = [
        { formikType: "FormikInput", label: "Model Yılı", name: "modelYear", type: "number", placeholder: "Model Year giriniz" },
        { formikType: "FormikInput", label: "Plaka", name: "plate", type: "string", placeholder: "Plate giriniz" },
        { formikType: "FormikInput", label: "Min Kredi Notu", name: "minFindeksRate", type: "number", placeholder: "Min Findeks Rate giriniz" },
        { formikType: "FormikInput", label: "Kilometre", name: "kilometer", type: "number", placeholder: "Kilometre giriniz" },
        { formikType: "FormikInput", label: "Günlük Ücret", name: "dailyPrice", type: "number", placeholder: "Daily Price giriniz" },
        { formikType: "FormikSelect", label: "Vites Tipi", name: "transmissionType", options: transmissionTypeOptions ? [initialOption, ...transmissionTypeOptions] : [] },
        { formikType: "FormikSelect", label: "Yakıt Tipi", name: "fuelType", options: fuelTypeOptions ? [initialOption, ...fuelTypeOptions] : [] },
        { formikType: "FormikSelect", label: "Kategory", name: "category", options: categoryOptions ? [initialOption, ...categoryOptions] : [] },
        { formikType: "FormikInput", label: "Yolcu Kapasitesi", name: "passengerCapacity", type: "number", placeholder: "Passenger Capacity giriniz" },
        { formikType: "FormikInput", label: "İndirim Oranı", name: "discount", type: "number", placeholder: "İndirim Oranı giriniz", defaultValue: 0 },
    ];

    if (isUpdate) {
    } else {
        formikInfo.push(
            { formikType: "FormikSelect", label: "Model", name: "modelId", options: models ? [initialOption, ...models] : [] },
            { formikType: "FormikSelect", label: "Color", name: "colorId", options: colors ? [initialOption, ...colors] : [] },
            { formikType: "FormikSelect", label: "Location", name: "locationId", options: locations ? [initialOption, ...locations] : [] }
        );
    }

    return formikInfo;
};