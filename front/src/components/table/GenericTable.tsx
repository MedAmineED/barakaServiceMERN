/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react';
import EditButton from '../actionButton/EditButton';
import DeleteButton from '../actionButton/DeleteButton';
import { InputFieldConfig } from 'src/util/types';

interface Column {
  header: string;
  accessor: string;
}

interface GenericTableProps {
  data: { [key: string]: any; }[];
  columns: Column[];
  inputFields: InputFieldConfig[];
  onEdit: (id : number, formData: { [key: string]: any }) => Promise<void>;
  onDelete: (id : number) => Promise<void>;
  fetchById: (id: number) => Promise<any>;
}

const GenericTable: FC<GenericTableProps> = ({ 
  data, 
  columns, 
  inputFields, 
  onEdit, 
  onDelete, 
  fetchById 
}) => {
  return (
    <div className="table-responsive" id="tab-pag">
      <table className="TabContenu table table-sm" id="iTabContenu">
        <thead className="thead-fixed">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="text-center align-middle">{column.header}</th>
            ))}
            <th className="text-center align-middle">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={item.id || rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>{item[column.accessor]}</td>
              ))}
              <td className='action-cell'>
                <EditButton
                  title="Modifier"
                  inputFields={inputFields}
                  onSave={onEdit}
                  id={item.id}
                  fetchById={fetchById}
                />
                <DeleteButton
                  onDelete={onDelete}
                  title="Supprimer"
                  id={item.id ? item.id : 0}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;