import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AddCarRequest } from '../../../models/cars/request/addCarRequest';
import { carSchema } from '../../validationSchemas/validationSchemas';
import BaseFetcher from '../../Fetch/BaseFetcher';
import locationService from '../../../service/baseSevice/locationService';
import colorService from '../../../service/baseSevice/colorService';
import modelService from '../../../service/baseSevice/modelService';
import { getFormikInfo } from '../../../utils/getFormikInfo';
import FormikInput from '../../FormikInput/FormikInput';
import FormikSelect from '../../FormikSelect/FormikSelect';
import { Option, generateOptions } from '../../GenerateOptions/GenerateOptions';
import { Category } from '../../../Enum/CategoryEnum';
import { FuelType } from '../../../Enum/FuelType';
import { TransmissionType } from '../../../Enum/TransmissionType';
import axiosInstance from '../../../utils/Interceptors';
import { AddInitialValues } from '../../../initialValues/CarInitialValues';

const AddCar: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [models, setModels] = useState([]);
  const [colors, setColors] = useState([]);
  const [locations, setLocations] = useState([]);


  const categoryOptions: Option[] = generateOptions(Category);
  const fuelTypeOptions: Option[] = generateOptions(FuelType);
  const transmissionTypeOptions: Option[] = generateOptions(TransmissionType);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (values: AddCarRequest) => {
    const formData = new FormData();
    // 'car' olarak JSON.stringify(values) ekliyoruz ama 'imageUrl' dahil etmiyoruz
    formData.append('car', JSON.stringify(values));
    if (file) {
      formData.append('file', file);
    }
  
    try {
      const response = await axiosInstance.post('http://localhost:8080/api/cars', formData, {
        headers: {
          // 'Content-Type': 'multipart/form-data', bu header'i çıkarabilirsiniz, axios otomatik olarak doğru değeri atayacaktır
        },
      });
  
      if (response.status === 201) {
        toast.success('Araç başarıyla eklendi!');
      } else {
        toast.error('Araç eklenemedi. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      toast.error('Bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Submit Error:', error);
    }
  };

  return (
    <div className='container'>
      <BaseFetcher service={() => locationService.getAll()} onBaseFetched={setLocations} />
      <BaseFetcher service={() => colorService.getAll()} onBaseFetched={setColors} />
      <BaseFetcher service={() => modelService.getAll()} onBaseFetched={setModels} />
      <Formik
        initialValues={AddInitialValues}
        onSubmit={handleSubmit}
        validationSchema={carSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <label className='form-label'>
              Image Url
              <input className='form-control' name="image" type="file" onChange={handleFileChange} />
            </label>
            {getFormikInfo(models, colors, locations, transmissionTypeOptions, fuelTypeOptions, categoryOptions).map((formikInfo) => {
              if (formikInfo.formikType === "FormikInput") {
                return <FormikInput key={`input-${formikInfo.name}`} label={formikInfo.label} name={formikInfo.name} type={formikInfo.type ?? ''} placeholder={formikInfo.placeholder ?? ''} />;
              } else if (formikInfo.formikType === "FormikSelect") {
                return <FormikSelect key={`select-${formikInfo.name}`} label={formikInfo.label} name={formikInfo.name} options={formikInfo.options ?? []} />;
              }
            })}
            <button className='btn btn-success form-control' type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCar;
