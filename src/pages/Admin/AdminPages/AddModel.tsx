import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { postModelModels } from '../../../models/modelModels/GetAllModelsModel';
import { BrandModel } from '../../../models/brandModels/GetAllBrandModel';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import brandService from '../../../service/baseSevice/brandService';
import modelService from '../../../service/baseSevice/modelService';

const AddModel: React.FC = () => {
  const [brands, setBrands] = useState<BrandModel[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brandsData = await brandService.getAll().then((response: any) => {
          if (Array.isArray(brandsData)) {
            setBrands(brandsData);
          } else {
            console.error('Invalid data received from BrandService.getAll().');
          }
        });;
        
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, []); // Run once when the component mounts

  const handleBrandChange = (selectedBrandId: number) => {
    formik.setFieldValue('brandId', selectedBrandId);
  };

  const formik = useFormik({
    initialValues: {
      modelName: '',
      brandId: 0,
    },
    validationSchema: Yup.object({
      modelName: Yup.string()
        .min(3, 'Model name must be at least 3 characters')
        .required('Model name is required'),
      brandId: Yup.number().required('Brand is required'),
    }),
    onSubmit: async (values) => {
      try {
        const modelData: postModelModels = {
          name: values.modelName,
          brandId: values.brandId,
        };

        const modelResponse = await modelService.getAll();

        console.log('Model added successfully!', modelResponse);

        // Toast success message
        toast.success('Model added successfully!');
      } catch (error) {
        console.error('Error:', error);

        // Toast error message
        toast.error('An error occurred while adding the model.');
      }
    },
  });

  return (
    <div className='col-8'>
        <div className='col-auto col-md-10 min-vh-100'>
      <h1>Add Model</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="modelName" className="form-label">
            Model Name:
          </label>
          <input
            type="text"
            className={`form-control ${formik.touched.modelName && formik.errors.modelName ? 'is-invalid' : ''}`}
            id="modelName"
            name="modelName"
            value={formik.values.modelName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.modelName && formik.errors.modelName && (
            <div className="invalid-feedback">{formik.errors.modelName}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="brandSelect" className="form-label">
            Choose Brand:
          </label>
          <select
            className={`form-select ${formik.touched.brandId && formik.errors.brandId ? 'is-invalid' : ''}`}
            id="brandSelect"
            name="brandId"
            onChange={(e) => {
              formik.handleChange(e);
              handleBrandChange(Number(e.target.value));
            }}
            onBlur={formik.handleBlur}
          >
            <option value="">Select Brand</option>
            {brands.map((brand) => (
              <option key={brand.name} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </select>
          {formik.touched.brandId && formik.errors.brandId && (
            <div className="invalid-feedback">{formik.errors.brandId}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Add Model
        </button>
      </form>
      </div>
    </div>
  );
};

export default AddModel;
