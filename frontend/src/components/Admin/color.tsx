import { useFormik } from 'formik';
import React, { useState } from 'react'
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import colorService from '../../service/baseSevice/colorService';


type Props = {}

const Color = (props: Props) => {
    const [colorName, setColorName] = useState<string>('');
    const formik = useFormik({
        initialValues: {
            name: '',
            },
            validationSchema: Yup.object({
                name: Yup.string()
                .min(3, 'Color name must be at least 3 characters')
                .required('Color name is required'),
            }),
            onSubmit: async (values) => {
                try {
                    const colorData = {
                        name: values.name,
                    };
                    const colorResponse = await colorService.add(colorData);
                    console.log('Location added successfully!');
                    toast.success('Location added successfully!');
                    formik.resetForm();
                } catch (error) {
                    console.error('An error occurred while adding the color:', error);
                    toast.error('An error occurred while adding the color.');
                }
            },
    });
  return (
    <div>
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="name">Color Name</label>
            <input
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            />
            {formik.errors.name ? <div>{formik.errors.name}</div> : null}
    
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Color;
