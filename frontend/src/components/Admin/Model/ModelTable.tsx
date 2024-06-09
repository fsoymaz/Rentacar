import React from 'react';
import { modelModels } from '../../../models/modelModels/GetAllModelsModel';

const ModelTable = ({ data }: { data: modelModels[] }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Model</th>
          <th>Marka</th>
        </tr>
      </thead>
      <tbody>
        {data.map((model: modelModels, index) => (
          <tr key={model.id}>
            <td>{model.id}</td>
            <td>{model.name}</td>
            <td>{model.brand?.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ModelTable;