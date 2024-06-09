import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import FormikInput from '../../FormikInput/FormikInput';
import brandService from '../../../service/baseSevice/brandService';

const BrandUpdate: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [brand, setBrand] = useState<any>({
    id: 0,
    name: '',
  });

  const fetchBrandByName = async (brandName: string) => {
    try {
      const response = await brandService.getBrandByName(brandName);
      console.log('fetchBrandByName response', response);
      const brandData = response.data;
      setBrand({
        id: brandData.id,
        name: brandData.name,
      });
      setIsVisible(true);
    } catch (error) {
      console.error('Error fetching brand:', error);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const response = await brandService.update({
        id: brand.id,
        name: values.name,
      });
      if (response.status === 200) {
        toast.success('Brand updated successfully');
      }
    } catch (error) {
      toast.error('Error updating brand');
    }
  };

  return (
    <div className='container' style={{ justifyContent: 'center', alignItems: 'center' }}>
      <h1>Update Brand</h1>
      <Formik
        initialValues={{ brandName: '' }}
        onSubmit={(values) => {
          fetchBrandByName(values.brandName);
        }}
        validationSchema={Yup.object().shape({
          brandName: Yup.string().required('Brand name is required'),
        })}
      >
        <Form className='form-container'>
          <FormikInput label="Brand Name" name="brandName" type="text" placeholder="Brand Name" />
          <button className='btn btn-success' type="submit">Show</button>
        </Form>
      </Formik>

      {isVisible && (
        <Formik
          initialValues={{ id: brand.id, name: brand.name }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Brand name is required'),
          })}
        >
          <Form>
            <FormikInput label="Brand ID" name="id" type="text" placeholder="Brand ID" />
            <FormikInput label="Brand Name" name="name" type="text" placeholder="Brand Name" />
            <button className='btn btn-success' type="submit">Update Brand</button>
          </Form>
        </Formik>
      )}

    </div>
  );
};

export default BrandUpdate;
