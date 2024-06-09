import React, { useState, useEffect } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { postModelModels } from '../../../models/modelModels/GetAllModelsModel';
import FormikInput from '../../../components/FormikInput/FormikInput';
import brandService from '../../../service/baseSevice/brandService';
import { Option } from '../../../components/GenerateOptions/GenerateOptions';
import modelService from '../../../service/baseSevice/modelService';
import BaseFetcher from '../../../components/Fetch/BaseFetcher';
import FormikSelect from '../../../components/FormikSelect/FormikSelect';
import { getModelInfo } from '../../../utils/getModelInfo';

const AddModel: React.FC = () => {
  const [brands, setBrands] = useState<Option[]>([]);


  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Marka seçimini işle
  };

  const initialValues: postModelModels = {
    name: '',
    brandId: 0
  };

  const modelSchema = Yup.object().shape({
    name: Yup.string().required('Model adı zorunludur'),
    brandId: Yup.number().min(1, 'Geçerli bir marka seçin').required('Marka zorunludur')
  });
  const handleSubmit = async (values: postModelModels, { resetForm }: FormikHelpers<postModelModels>) => {
    try {
      const response = await modelService.add(values);
      if (response.status === 201) {
        toast.success('Model başarıyla eklendi!');
        resetForm();
      } else {
        toast.error('Model eklenemedi, lütfen eksik alanları doldurun.');
      }
    } catch (error) {
      toast.error('Bilinmeyen bir hata oluştu.');
    }
  };
  

  return (
    <div className='container'>
    <BaseFetcher service={() => brandService.getAll()} onBaseFetched={setBrands} />

    <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={modelSchema}
      >
        {({ handleSubmit: formikSubmit }) => (
          <Form>
            {getModelInfo(brands).map((formikInfo) => {
              if (formikInfo.formikType === "FormikInput") {
                return <FormikInput key={`input-${formikInfo.name}`} label={formikInfo.label} name={formikInfo.name} type={formikInfo.type ?? ''} placeholder={formikInfo.placeholder ?? ''} />;
              } else if (formikInfo.formikType === "FormikSelect") {
                return <FormikSelect key={`select-${formikInfo.name}`} label={formikInfo.label} name={formikInfo.name} options={formikInfo.options ?? []} />;
              }
            })}
            <button className='btn btn-success form-control' type="button" onClick={() => formikSubmit()}>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddModel;
