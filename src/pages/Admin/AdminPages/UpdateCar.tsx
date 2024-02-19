import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import FormikInput from '../../../components/FormikInput/FormikInput';
import FormikSelect from '../../../components/FormikSelect/FormikSelect';
import modelService from '../../../service/baseSevice/modelService';
import colorService from '../../../service/baseSevice/colorService';
import carService from '../../../service/baseSevice/carService';
import { AddCarRequest } from '../../../models/cars/request/addCarRequest';
import { Category } from '../../../Enum/CategoryEnum';
import { FuelType } from '../../../Enum/FuelType';
import { TransmissionType } from '../../../Enum/TransmissionType';
import { Option, generateOptions } from '../../../components/GenerateOptions/GenerateOptions';
import locationService from '../../../service/baseSevice/locationService';
import { Image } from 'semantic-ui-react';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import { UpdateCarRequest } from '../../../models/cars/request/updateCarRequest';
import imageDataService from '../../../service/baseSevice/imageDataService';

// Enum for category
const categoryOptions: Option[] = generateOptions(Category);
const fuelTypeOptions: Option[] = generateOptions(FuelType);
const transmissionTypeOptions: Option[] = generateOptions(TransmissionType);

const validationSchema = Yup.object().shape({
  // Validation rules should be added here
});

const UpdateCar: React.FC = () => {
  const [imagePath, setImagePath] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [initialValues, setInitialValues] = useState<UpdateCarRequest>({
    id: 0,
    modelYear: 0,
    plate: '',
    minFindeksRate: 0,
    kilometer: 0,
    dailyPrice: 0,
    transmissionType: '',
    fuelType: '',
    category: '',
    passengerCapacity: 0,
    imagePath: ''
  });

  const fetchCarByPlate = async (plate: string) => {
    console.log("ben geldim", plate);
    try {
      const response = await carService.getByPlate(plate);
      const carData = response.data;
      console.log("carData", carData);
      setInitialValues({
        id: carData.id,
        modelYear: carData.modelYear,
        plate: carData.plate,
        minFindeksRate: carData.minFindeksRate,
        kilometer: carData.kilometer,
        dailyPrice: carData.dailyPrice,
        transmissionType: carData.transmissionType,
        fuelType: carData.fuelType,
        category: carData.category,
        passengerCapacity: carData.passengerCapacity,
        imagePath: carData.imagePath
      });
      setIsVisible(true);
    } catch (error) {
      console.error('Error fetching car:', error);
    }
  };

  const plateFunction = async (values: plateValue) => {
    console.log("ben geldim", values.plate);
    await fetchCarByPlate(values.plate);
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      formData.append('image', event.currentTarget.files[0]);
    }

    const response = await imageDataService.add(formData);
    setImagePath(response.data);
  };

  const FormikInfo = [
    { formikType: "FormikInput", label: "Id", name: "id", type: "number", placeholder: "Id giriniz"},
    { formikType: "FormikInput", label: "Model Year", name: "modelYear", type: "number", placeholder: "Model Year giriniz" },
    { formikType: "FormikInput", label: "Plate", name: "plate", type: "string", placeholder: "Plate giriniz" },
    { formikType: "FormikInput", label: "Min Findeks Rate", name: "minFindeksRate", type: "number", placeholder: "Min Findeks Rate giriniz" },
    { formikType: "FormikInput", label: "Kilometer", name: "kilometer", type: "number", placeholder: "Kilometre giriniz" },
    { formikType: "FormikInput", label: "Daily Price", name: "dailyPrice", type: "number", placeholder: "Daily Price giriniz" },
    { formikType: "FormikSelect", label: "Transmission Type", name: "transmissionType", options: transmissionTypeOptions },
    { formikType: "FormikSelect", label: "Fuel Type", name: "fuelType", options: fuelTypeOptions },
    { formikType: "FormikSelect", label: "Category", name: "category", options: categoryOptions },
    { formikType: "FormikInput", label: "Passenger Capacity", name: "passengerCapacity", type: "number", placeholder: "Passenger Capacity giriniz" },
  ];

  const handleSubmit = async (values: UpdateCarRequest) => {
    try {
      const response = await carService.update(values);
      console.log('response:', response);
      if (response.status === 201) {
        toast.success('Car updated successfully');
      }
    } catch (error) {
      toast.error('Error updating car');
    }
  };

  interface plateValue {
    plate: string;
  }

  return (
    <div className='container' style={{ justifyContent: 'center', alignItems: 'center' }}>
      <h1>Update Car</h1>
      <Formik
        initialValues={{ plate: '' }}
        onSubmit={plateFunction}
        validationSchema={validationSchema}
      >
        <Form className='form-container'>
          <FormikInput key="plate" label="plate" name="plate" type="string" placeholder="plate" />
          <button type="submit">Sub</button>
        </Form>
      </Formik>

      {isVisible && (
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            {FormikInfo.map((formikInfo, index) => {
              if (formikInfo.formikType === "FormikInput") {
                return <FormikInput key={index} label={formikInfo.label} name={formikInfo.name} type={formikInfo.type ?? ''} placeholder={formikInfo.placeholder ?? ''} />;
              } else if (formikInfo.formikType === "FormikSelect") {
                return <FormikSelect key={index} label={formikInfo.label} name={formikInfo.name} options={formikInfo.options ?? []} />;
              }
            })}
            <label className='form-label'>
              Image Path
              <br />
              <input name="image" type="file" onChange={handleImageChange} />
            </label>
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      )}

    </div>
  );
};

export default UpdateCar;
