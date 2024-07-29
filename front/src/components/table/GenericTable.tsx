/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState } from 'react';
import EditButton from '../actionButton/EditButton';
import DeleteButton from '../actionButton/DeleteButton';
import { InputFieldConfig } from 'src/util/types';
import { Form } from 'react-bootstrap';
import './style.css';

interface Column {
  header: string;
  accessor: string;
}

interface GenericTableProps {
  data: { [key: string]: any }[];
  columns: Column[];
  inputFields?: InputFieldConfig[];
  selectedItems?: any[];
  onEdit?: (id: number, formData: { [key: string]: any }) => Promise<void>;
  onDelete?: (id: number) => Promise<void>;
  fetchById?: (id: number) => Promise<any>;
  onCheckedItemsChange?: (check: boolean, service: any) => void;
}

const GenericTable: FC<GenericTableProps> = ({
  data,
  columns,
  inputFields,
  onEdit,
  onDelete,
  fetchById,
  onCheckedItemsChange,
  selectedItems
}) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const newCheckedItems: { [key: number]: boolean } = {};
    if(selectedItems){
        selectedItems.forEach(item => {
          newCheckedItems[item.id] = true;
        });
    }
    setCheckedItems(newCheckedItems);
    console.log("checkedItems from use state : ", checkedItems)
  }, [selectedItems]);

  const handleCheckboxChange = (item: any) => {
    const isChecked = !checkedItems[item.id];
    console.log("item from generic table ", item);
    console.log("item.id from generic table ", item.id);
    console.log("isChecked from generic table ", isChecked);
    console.log("checkedItems from generic table ", checkedItems);
    console.log("checkedItems id from generic table ", checkedItems[item.id]);
    console.log("selectedItems from generic table ", selectedItems);
    if (onCheckedItemsChange) {
      onCheckedItemsChange(isChecked, item);
    }
  };
 
  // Sort data so that selected items appear first
  const sortedData = [...data].sort((a, b) : number => {
    if(selectedItems){
      const aSelected = selectedItems.some(item => item.id === a.id);
      const bSelected = selectedItems.some(item => item.id === b.id);
      return (bSelected - aSelected);
    }
    return 0;
  });

  return (
    <div className="table-responsive" id="tab-pag">
      <table className="TabContenu table table-sm" id="iTabContenu">
        <thead className="thead-fixed">
          <tr>
            {onCheckedItemsChange && <th></th>}
            {columns.map((column, index) => (
              <th key={index} className="text-center align-middle">{column.header}</th>
            ))}
            {(onDelete && onEdit) && <th className="text-center align-middle">Action</th>}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, rowIndex) => (
            <tr key={item.id || rowIndex}>
              {onCheckedItemsChange && (
                <td className="check-cell">
                  <Form.Check
                    checked={selectedItems.some((si) => si.id === item.id)}
                    onChange={() => handleCheckboxChange(item)}
                    type="checkbox"
                  />
                </td>
              )}
              {columns.map((column, colIndex) => (
                <td key={colIndex}>{item[column.accessor]}</td>
              ))}
              {(onEdit && onDelete) && (
                <td className="action-cell">
                  <EditButton
                    title="Modifier"
                    inputFields={inputFields || []}
                    onSave={onEdit}
                    id={item.id}
                    fetchById={fetchById}
                  />
                  <DeleteButton
                    onDelete={onDelete}
                    title="Supprimer"
                    id={item.id || 0}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;
