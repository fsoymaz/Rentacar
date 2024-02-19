// AddCar.tsx

import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import FormikInput from '../../../components/FormikInput/FormikInput';
import FormikSelect from '../../../components/FormikSelect/FormikSelect';
import carService from '../../../service/baseSevice/carService';
import { AddCarRequest } from '../../../models/cars/request/addCarRequest';
import { Category } from '../../../Enum/CategoryEnum';
import { FuelType } from '../../../Enum/FuelType';
import { TransmissionType } from '../../../Enum/TransmissionType';
import { Option, generateOptions } from '../../../components/GenerateOptions/GenerateOptions';
import LocationFetcher from '../../../components/Fetch/FetchLocations';
import ModelFetcher from '../../../components/Fetch/FetchModels';
import ColorFetcher from '../../../components/Fetch/FetchColors';
import { AddInitialValues } from '../../../components/CarInitialValues/AddInitialValues';
import imageDataService from '../../../service/baseSevice/imageDataService';

// Enum for category

const categoryOptions: Option[] = generateOptions(Category);
const fuelTypeOptions: Option[] = generateOptions(FuelType);
const transmissionTypeOptions: Option[] = generateOptions(TransmissionType);
const validationSchema = Yup.object().shape({
  // Validation rules should be added here
});


const AddCar: React.FC = () => {
  const [models, setModels] = useState<Option[]>([]);
  const [colors, setColors] = useState<Option[]>([]);
  const [locations, setLocations] = useState<Option[]>([]);
  const [imagePath, setImagePath] = useState<string>('');

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      formData.append('image', event.currentTarget.files[0]);
    }

    const response = await imageDataService.add(formData);
    setImagePath(response.data);
  };
  const initialOption: any = { value: '', name: 'Lütfen bir Seçim yapınız', label: 'Seçiniz' }; // Başlangıç seçeneği için bir nesne oluştur


  const FormikInfo = [
    { formikType: "FormikInput", label: "Model Year", name: "modelYear", type: "number", placeholder: "Model Year giriniz" },
    { formikType: "FormikInput", label: "Plate", name: "plate", type: "string", placeholder: "Plate giriniz" },
    { formikType: "FormikInput", label: "Min Findeks Rate", name: "minFindeksRate", type: "number", placeholder: "Min Findeks Rate giriniz" },
    { formikType: "FormikInput", label: "Kilometer", name: "kilometer", type: "number", placeholder: "Kilometre giriniz" },
    { formikType: "FormikInput", label: "Daily Price", name: "dailyPrice", type: "number", placeholder: "Daily Price giriniz" },
    { formikType: "FormikSelect", label: "Model", name: "modelId", options: [initialOption, ...models] }, // Add the initial option
    { formikType: "FormikSelect", label: "Color", name: "colorId", options: [initialOption, ...colors] }, // Add the initial option
    { formikType: "FormikSelect", label: "Location", name: "locationId", options: [initialOption, ...locations] },
    { formikType: "FormikSelect", label: "Transmission Type", name: "transmissionType", options: transmissionTypeOptions },
    { formikType: "FormikSelect", label: "Fuel Type", name: "fuelType", options: fuelTypeOptions },
    { formikType: "FormikSelect", label: "Category", name: "category", options: categoryOptions },
    { formikType: "FormikInput", label: "Passenger Capacity", name: "passengerCapacity", type: "number", placeholder: "Passenger Capacity giriniz" },
  ];


  return (
    <div className='container' style={{ justifyContent: 'center', alignItems: 'center' }}>
      <LocationFetcher onLocationsFetched={setLocations} />
      <ModelFetcher onModelsFetched={setModels} />
      <ColorFetcher onColorsFetched={setColors} />
      <Formik
          initialValues={{
            ...AddInitialValues,
            fuelType: "Yakıt Tipi Giriniz", // Add this line
            transmissionType: "Vites Tipi Seçiniz", // Add this line
            category:  "Kategory Seçiniz" // Add this line
          }}
        onSubmit={async (values: AddCarRequest, { resetForm }) => {
          try {
            console.log('values:', values);
            const carDataWithImage = { ...values, imagePath };
            const response = await carService.add(carDataWithImage);
            console.log('Car added successfully:', response.data);
            toast.success('Car added successfully!');
          } catch (error) {
            console.error('Error adding car:', error);
            toast.error('An error occurred while adding the car.');
          }
        }}
        validationSchema={validationSchema}
      >
        <Form>
          {FormikInfo.map((formikInfo, index) => {
            if (formikInfo.formikType === "FormikInput") {
              return <FormikInput key={`input-${formikInfo.name}`} label={formikInfo.label} name={formikInfo.name} type={formikInfo.type ?? ''} placeholder={formikInfo.placeholder ?? ''} />;
            } else if (formikInfo.formikType === "FormikSelect") {
              return <FormikSelect key={`select-${formikInfo.name}`} label={formikInfo.label} name={formikInfo.name} options={formikInfo.options ?? []} />;
            }
          })}
          <label className='form-label'>
            Image PAth
            <br />
            <input name="image" type="file" onChange={handleImageChange} />
          </label>
          <button type="submit">Submit</button>
        </Form>
      </Formik>

    </div>
  );
};

export default AddCar;
