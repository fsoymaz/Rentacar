import React, { useState } from 'react';
import { Formik, Form } from 'formik';
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

  const FormikInfo = getFormikInfo(models, colors, locations, transmissionTypeOptions, fuelTypeOptions, categoryOptions);

  return (
    <div className='container' style={{ justifyContent: 'center', alignItems: 'center' }}>
      <BaseFetcher service={() => locationService.getAll()} onBaseFetched={setLocations} />
      <BaseFetcher service={() => colorService.getAll()} onBaseFetched={setColors} />
      <BaseFetcher service={() => modelService.getAll()} onBaseFetched={setModels} />


      <Formik
        initialValues={AddInitialValues}
        onSubmit={async (values: AddCarRequest, { resetForm }) => {
          try {
            const carDataWithImage = { ...values, imagePath };
            const response = await carService.add(carDataWithImage);
            if (response.status === 201) {
              toast.success('Araç Başarı ile eklendi!');
              return;
            } else
              toast.error('Araç eklenemedi eksik alanları doldurun');
              return;
          } catch (error) {
            toast.error('Bilinmedik Hata.');
          }
        }}
        validationSchema={carSchema}
      >
        <Form>
          {FormikInfo.map((formikInfo) => {
            if (formikInfo.formikType === "FormikInput") {
              return <FormikInput key={`input-${formikInfo.name}`} label={formikInfo.label} name={formikInfo.name} type={formikInfo.type ?? ''} placeholder={formikInfo.placeholder ?? ''} />;
            } else if (formikInfo.formikType === "FormikSelect") {
              return <FormikSelect key={`select-${formikInfo.name}`} label={formikInfo.label} name={formikInfo.name} options={formikInfo.options ?? []} />;
            }
          })}
          <label className='form-label'>
            Image Path
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
