import React from 'react';
import { Table, Button } from 'react-bootstrap';

interface DataTableProps<T> {
  data: T[];
  columns: Array<{
    key: keyof T;
    label: string;
    render?: (value: any, item: T) => React.ReactNode;
  }>;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  actions?: boolean;
}

function DataTable<T extends { id: number }>({ 
  data, 
  columns, 
  onEdit, 
  onDelete, 
  actions = true 
}: DataTableProps<T>) {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={String(column.key)}>{column.label}</th>
          ))}
          {actions && <th>İşlemler</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td key={String(column.key)}>
                {column.render 
                  ? column.render(item[column.key], item)
                  : String(item[column.key] || '')
                }
              </td>
            ))}
            {actions && (
              <td>
                {onEdit && (
                  <Button 
                    variant="warning" 
                    size="sm" 
                    className="me-2"
                    onClick={() => onEdit(item)}
                  >
                    Düzenle
                  </Button>
                )}
                {onDelete && (
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => onDelete(item)}
                  >
                    Sil
                  </Button>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default DataTable; 