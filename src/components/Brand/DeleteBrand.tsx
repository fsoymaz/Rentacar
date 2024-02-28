import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import brandService from '../../service/baseSevice/brandService';

const DeleteBrand: React.FC = () => {
  const [brandName, setBrandName] = useState<string>('');
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      // Markanın varlığını kontrol et
      const response = await brandService.getBrandByName(brandName);
      if (!response.data) {
        toast.error('Brand with the provided name does not exist');
        return;
      }
      
      const brandData = response.data;
      console.log('brandData:', brandData);
      const confirm = window.confirm(`Are you sure you want to delete the brand "${brandName}"?`);
      if (confirm) {
        await brandService.delete(brandData.id);
        toast.success('Brand deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting brand:', error);
      toast.error('Error deleting brand');
    }
  };

  return (
    <div className='container' style={{ justifyContent: 'center', alignItems: 'center' }}>
      <label className='form-label'>Enter Brand Name:</label>
      <input className='form-control'
        type="text"
        value={brandName}
        onChange={(e) => setBrandName(e.target.value)}
        placeholder="Enter brand name..."
      />
      <button className='btn btn-danger' onClick={handleDelete}>Delete Brand</button>
    </div>
  );
};

export default DeleteBrand;
