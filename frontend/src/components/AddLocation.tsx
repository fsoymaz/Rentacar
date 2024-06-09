import { useFormik } from 'formik';
import React, { useState } from 'react'
import * as Yup from 'yup';
import { PostlocationModels, locationModels } from '../models/locations/locationModels';
import locationService from '../service/baseSevice/locationService';
import { toast } from 'react-toastify';

type Props = {}

const AddLocation = (props: Props) => {
    const [locationName, setLocationName] = useState<string>('');
    const formik = useFormik({
        initialValues: {
            name: '',
            },
            validationSchema: Yup.object({
                name: Yup.string()
                .min(3, 'Location name must be at least 3 characters')
                .required('Location name is required'),
            }),
            onSubmit: async (values) => {
                try {
                    const locationData: PostlocationModels = {
                        name: values.name,
                    };
                    const locationResponse = await locationService.add(locationData);
                    console.log('Location added successfully!');
                    toast.success('Location added successfully!');
                    formik.resetForm();
                } catch (error) {
                    console.error('An error occurred while adding the location:', error);
                    toast.error('An error occurred while adding the location.');
                }
            },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="name">Location Name</label>
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

export default AddLocation