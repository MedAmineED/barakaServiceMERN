/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {  useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import './style.css'; // We'll create this CSS file for custom styles
import { InputFieldConfig } from 'src/util/types';



interface InputModalProps {
  title: string;
  inputFields: InputFieldConfig[];
  onSave: (formData: { [key: string]: any }) => Promise<void>;
  textButton : string;
}

const InputModal: React.FC<InputModalProps> = ({ title, inputFields, onSave, textButton }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});





  const handleClose = () =>{
        setShow(false);
        resetFormData();
    };
  const handleShow = () => setShow(true);

  const resetFormData = () => {
    const newFormData: { [key: string]: any } = {};
  
    for (const key in formData) {
      if (Object.prototype.hasOwnProperty.call(formData, key)) {
        // Determine the type of the value and set default
        if (typeof formData[key] === 'number') {
          newFormData[key] = 0; // Set numeric values to 0
        } else {
          newFormData[key] = ''; // Set other types to empty string
        }
      }
    }
  
    setFormData(newFormData);
  };


  const handleChange = (controlId: string, value: any) => {
    console.log("from handle change ",formData);
    setFormData((prev) => ({ ...prev, [controlId]: value }));
  };

  const handleSave = async () => {
    console.log(formData);
    try {
        await onSave(formData);
        console.log(formData)
    }catch(err) {
        console.log(err);
    }
  };

  return (
    <div>
      <Button className='btn btn-primary add-btn' variant="primary" onClick={handleShow}>
        {textButton}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        className="compact-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="h5">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-2" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <Form className="compact-form">
            <div className="row g-1">
              {inputFields.map((field, index) => (
                <React.Fragment key={field.controlId + index}>
                  <div className={field.col ? field.col : "col-4"}>
                    <Form.Group controlId={field.controlId}>
                      <Form.Label>{field.label}</Form.Label>
                      {field.unit ? (
                        <InputGroup>
                          <Form.Control
                            type={field.type}
                            placeholder={field.placeholder}
                            step={field.step}
                            onChange={(e) => handleChange(field.controlId, e.target.value)}
                            value={formData[field.controlId] || ''}
                          />
                          <InputGroup.Text>{field.unit}</InputGroup.Text>
                        </InputGroup>
                      ) : field.type == "select" ? (
                        <select
                          className='form-select'
                          onChange={(e) => handleChange(field.controlId, e.target.value)}
                          value={formData[field.controlId] || ''}
                        >
                          <option disabled value="">{field.placeholder}</option>
                          {field.options && field.options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) :  (
                        <Form.Control
                          type={field.type}
                          placeholder={field.placeholder}
                          step={field.step}
                          onChange={(e) => handleChange(field.controlId, e.target.value)}
                          value={formData[field.controlId] || ''}
                        />
                      )  
                      }
                    </Form.Group>
                  </div>
                  
                </React.Fragment>
              ))}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" size="sm" onClick={handleClose}>
            Fermer
          </Button>
          <Button variant="primary" size="sm" onClick={handleSave}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InputModal;
