import React, { useState } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { toast } from 'react-toastify';

import FormikInput from '../../../../components/FormikInput/FormikInput';
import FormikSelect from '../../../../components/FormikSelect/FormikSelect';
import carService from '../../../../service/baseSevice/carService';
import { AddCarRequest } from '../../../../models/cars/request/addCarRequest';
import { Category } from '../../../../Enum/CategoryEnum';
import { FuelType } from '../../../../Enum/FuelType';
import { TransmissionType } from '../../../../Enum/TransmissionType';
import { Option, generateOptions } from '../../../../components/GenerateOptions/GenerateOptions';
import imageDataService from '../../../../service/baseSevice/imageDataService';
import { getFormikInfo } from '../../../../utils/getFormikInfo';
import { AddInitialValues } from '../../../../initialValues/CarInitialValues';
import locationService from '../../../../service/baseSevice/locationService';
import BaseFetcher from '../../../../components/Fetch/BaseFetcher';
import colorService from '../../../../service/baseSevice/colorService';
import modelService from '../../../../service/baseSevice/modelService';
import { carSchema } from '../../../../components/validationSchemas/validationSchemas';

const AddCar: React.FC = () => {
  const [models, setModels] = useState<Option[]>([]);
  const [colors, setColors] = useState<Option[]>([]);
  const [locations, setLocations] = useState<Option[]>([]);
  const [imagePath, setImagePath] = useState<string>('');

  const categoryOptions: Option[] = generateOptions(Category);
  const fuelTypeOptions: Option[] = generateOptions(FuelType);
  const transmissionTypeOptions: Option[] = generateOptions(TransmissionType);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      formData.append('image', event.currentTarget.files[0]);
    }

    const response = await imageDataService.add(formData);
    setImagePath(response.data);
  };

  const handleSubmit = async (values: AddCarRequest, { resetForm }: FormikHelpers<AddCarRequest>) => {
    if (!imagePath) {
      toast.error('Lütfen önce bir resim ekleyin!');
      return;
    }

    try {
      const carDataWithImage = { ...values, imagePath };
      const response = await carService.add(carDataWithImage);
      if (response.status === 201) {
        toast.success('Araç Başarı ile eklendi!');
        resetForm();
      } else {
        toast.error('Araç eklenemedi, lütfen eksik alanları doldurun.');
      }
    } catch (error) {
      toast.error('Bilinmeyen bir hata oluştu.');
    }
  };

  const handleFormSubmit = (formikSubmit: (values?: AddCarRequest) => void) => {
    if (!imagePath) {
      toast.error('Lütfen önce bir resim ekleyin!');
      return;
    }

    formikSubmit(); // Formik form submit işlemini gerçekleştir
  };

  return (
    <div className='container' style={{ justifyContent: 'center', alignItems: 'center' }}>
      <BaseFetcher service={() => locationService.getAll()} onBaseFetched={setLocations} />
      <BaseFetcher service={() => colorService.getAll()} onBaseFetched={setColors} />
      <BaseFetcher service={() => modelService.getAll()} onBaseFetched={setModels} />

      <Formik
        initialValues={AddInitialValues}
        onSubmit={handleSubmit}
        validationSchema={carSchema}
      >
        {({ handleSubmit: formikSubmit }) => (
          <Form>
            {getFormikInfo(models, colors, locations, transmissionTypeOptions, fuelTypeOptions, categoryOptions).map((formikInfo) => {
              if (formikInfo.formikType === "FormikInput") {
                return <FormikInput key={`input-${formikInfo.name}`} label={formikInfo.label} name={formikInfo.name} type={formikInfo.type ?? ''} placeholder={formikInfo.placeholder ?? ''} />;
              } else if (formikInfo.formikType === "FormikSelect") {
                return <FormikSelect key={`select-${formikInfo.name}`} label={formikInfo.label} name={formikInfo.name} options={formikInfo.options ?? []} />;
              }
            })}
            <label className='form-label'>
              Image Path
              <input className='form-control' name="image" type="file" onChange={handleImageChange} />
            </label>
            <button className='btn btn-success form-control' type="button" onClick={() => formikSubmit()}>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCar;
