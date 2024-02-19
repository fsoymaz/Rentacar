// AddCar.tsx

import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import FormikInput from '../../../../components/FormikInput/FormikInput';
import FormikSelect from '../../../../components/FormikSelect/FormikSelect';
import carService from '../../../../service/baseSevice/carService';
import { AddCarRequest } from '../../../../models/cars/request/addCarRequest';
import { Category } from '../../../../Enum/CategoryEnum';
import { FuelType } from '../../../../Enum/FuelType';
import { TransmissionType } from '../../../../Enum/TransmissionType';
import { Option, generateOptions } from '../../../../components/GenerateOptions/GenerateOptions';
import LocationFetcher from '../../../../components/Fetch/FetchLocations';
import ModelFetcher from '../../../../components/Fetch/FetchModels';
import ColorFetcher from '../../../../components/Fetch/FetchColors';
import imageDataService from '../../../../service/baseSevice/imageDataService';
import { getFormikInfo } from '../../../../utils/getFormikInfo';
import { AddInitialValues } from '../../../../initialValues/CarInitialValues';
import { carSchema } from '../../../../components/validationSchemas/validationSchemas';

// Enum for category




const AddCar: React.FC = () => {
  const categoryOptions: Option[] = generateOptions(Category);
  const fuelTypeOptions: Option[] = generateOptions(FuelType);
  const transmissionTypeOptions: Option[] = generateOptions(TransmissionType);
  const [models, setModels] = useState<Option[]>([]);
  const [colors, setColors] = useState<Option[]>([]);
  const [locations, setLocations] = useState<Option[]>([]);
  const [imagePath, setImagePath] = useState<string>('');

  const initialValues = {
    ...AddInitialValues,
    fuelType: "Yakıt Tipi Giriniz", // Add this line
    transmissionType: "Vites Tipi Seçiniz", // Add this line
    category: "Kategory Seçiniz" // Add this line
  };

  const initialOption: any = { value: '', name: 'Lütfen bir Seçim yapınız', label: 'Seçiniz' };
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      formData.append('image', event.currentTarget.files[0]);
    }

    const response = await imageDataService.add(formData);
    setImagePath(response.data);
  };

  
  const FormikInfo = getFormikInfo(models, colors, locations, transmissionTypeOptions, fuelTypeOptions, categoryOptions);

  return (
    <div className='container' style={{ justifyContent: 'center', alignItems: 'center' }}>
      <LocationFetcher onLocationsFetched={setLocations} />
      <ModelFetcher onModelsFetched={setModels} />
      <ColorFetcher onColorsFetched={setColors} />
      <Formik
        initialValues={initialValues}
        onSubmit={async (values: AddCarRequest, { resetForm }) => {
          try {
            const carDataWithImage = { ...values, imagePath };
            const response = await carService.add(carDataWithImage);
            toast.success('Car added successfully!');
          } catch (error) {
            toast.error('An error occurred while adding the car.');
          }
        }}
        validationSchema={""}
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
          </label><br />
          <button className='btn btn-success' type="submit">Submit</button>
        </Form>
      </Formik>

    </div>
  );
};

export default AddCar;
