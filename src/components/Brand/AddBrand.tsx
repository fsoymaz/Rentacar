import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PostBrandModel } from '../../models/brandModels/GetAllBrandModel';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import brandService from '../../service/baseSevice/brandService';

const AddBrand: React.FC = () => {
  const [brandName, setBrandName] = useState<string>('');

  const formik = useFormik({
    initialValues: {
      brandName: '',
    },
    validationSchema: Yup.object({
      brandName: Yup.string()
        .min(3, 'Brand name must be at least 3 characters')
        .required('Brand name is required'),
    }),
    onSubmit: async (values) => {
      try {
        const brandData: PostBrandModel = {
          name: values.brandName,
        };
  
        const brandResponse = await brandService.add(brandData);
  
        console.log('Brand added successfully!');
        toast.success('Brand added successfully!');
        formik.resetForm();
      } catch (error) {
        console.error('An error occurred while adding the brand:', error);
        toast.error('An error occurred while adding the brand.');
      }
    },
  });
  
  return (
    <div className="col-6">
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <h1>Add Brand</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="brandName" className="form-label">
                Brand Name:
              </label>
              <input
                type="text"
                id="brandName"
                name="brandName"
                value={formik.values.brandName}
                onChange={formik.handleChange}
                className={`form-control ${formik.touched.brandName && formik.errors.brandName ? 'is-invalid' : ''}`}
              />
              {formik.touched.brandName && formik.errors.brandName && (
                <div className="invalid-feedback">{formik.errors.brandName}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Add Brand
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBrand;
