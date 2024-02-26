import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import FormikInput from '../../../../components/FormikInput/FormikInput';
import FormikSelect from '../../../../components/FormikSelect/FormikSelect';
import carService from '../../../../service/baseSevice/carService';
import { Category } from '../../../../Enum/CategoryEnum';
import { FuelType } from '../../../../Enum/FuelType';
import { TransmissionType } from '../../../../Enum/TransmissionType';
import { Option, generateOptions } from '../../../../components/GenerateOptions/GenerateOptions';
import { UpdateCarRequest } from '../../../../models/cars/request/updateCarRequest';
import imageDataService from '../../../../service/baseSevice/imageDataService';
import { getFormikInfo } from '../../../../utils/getFormikInfo';
import { UpdateInitialValues } from '../../../../initialValues/CarInitialValues';

interface plateValue {
  plate: string;
}
const categoryOptions: Option[] = generateOptions(Category);
const fuelTypeOptions: Option[] = generateOptions(FuelType);
const transmissionTypeOptions: Option[] = generateOptions(TransmissionType);
const isupdate: boolean = true;
const validationSchema = Yup.object().shape({
  plate: Yup.string()
    .required('Plate is required'),
});
const UpdateCar: React.FC = () => {
  const [imagePath, setImagePath] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [plate, setPlate] = useState<string>('');
  const [initialValues, setInitialValues] = useState<UpdateCarRequest>(
    UpdateInitialValues
  );

  const fetchCarByPlate = async (plate: string) => {
    try {
      const response = await carService.getByPlate(plate);
      const carData = response.data;
      setInitialValues({
        id: carData.id,
        imagePath: carData.imagePath,
        modelYear: carData.modelYear,
        plate: carData.plate,
        minFindeksRate: carData.minFindeksRate,
        kilometer: carData.kilometer,
        dailyPrice: carData.dailyPrice,
        transmissionType: carData.transmissionType,
        fuelType: carData.fuelType,
        category: carData.category,
        passengerCapacity: carData.passengerCapacity,
        discount: carData.discount,
      });
      setIsVisible(true);
    } catch (error) {
      console.error('Error fetching car:', error);
    }
  };

  const plateFunction = async (values: plateValue) => {
    try {
      setIsVisible(false);
      // Kontrol edilecek olan plaka değeri
      const plateValueToCheck = values.plate;
      // Veritabanında plakanın varlığını kontrol et
      const response = await carService.getByPlate(plateValueToCheck);
      // Eğer plaka bulunamazsa hata mesajı göster
      if (!response.data) {
        toast.error('Plate not found in the database');
        return;
      }
      // Plaka bulunduysa diğer işlemlere devam et
      await fetchCarByPlate(plateValueToCheck);
      setPlate(plateValueToCheck);
      setIsVisible(true);
    } catch (error) {
      console.error('Error checking plate:', error);
    }
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      formData.append('image', event.currentTarget.files[0]);
    }

    const response = await imageDataService.add(formData);
    setImagePath(response.data);
  };

  const FormikInfo = getFormikInfo([], [], [], transmissionTypeOptions, fuelTypeOptions, categoryOptions, isupdate);

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
          <button className='btn btn-success' type="submit">Göster</button>
        </Form>
      </Formik>

      {isVisible && (
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <label className='form-label'>
              Image Path
              <br />
              <input name="image" type="file" onChange={handleImageChange} />
            </label>
            {FormikInfo.map((formikInfo, index) => {
              if (formikInfo.formikType === "FormikInput") {
                return <FormikInput key={index} label={formikInfo.label} name={formikInfo.name} type={formikInfo.type ?? ''} placeholder={formikInfo.placeholder ?? ''} />;
              } else if (formikInfo.formikType === "FormikSelect") {
                return <FormikSelect key={index} label={formikInfo.label} name={formikInfo.name} options={formikInfo.options ?? []} />;
              }
            })}
            <br />
            <button className='btn btn-success' type="submit">Değiştir</button>
          </Form>
        </Formik>
      )}

    </div>
  );
};

export default UpdateCar;
