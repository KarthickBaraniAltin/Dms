import React from 'react'
import { Form, Col } from 'react-bootstrap'

export default function DateInput({ label, value, name, md, size, defaultValue, disabled, onChange, placeholder,required }) {
  return (
    <Form.Group as={Col} md={md}>
        <div className={`label-with-asteriks ${required ? "required" : " "}`}>
          <Form.Label className="fw-bold">{label}</Form.Label>
        </div>
        <Form.Control 
          className='border border-dark'
          name={name} 
          value={value}
          defaultValue={defaultValue}
          disabled={disabled ? disabled : false} 
          size={size} 
          onChange={onChange} 
          required={required}
          type='date' 
          placeholder={placeholder}
        />
        {/* <Form.Control.Feedback type="invalid">Please provide input</Form.Control.Feedback> */}
    </Form.Group>
  )
}
