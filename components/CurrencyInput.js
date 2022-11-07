import React from 'react'
import { InputGroup, FormControl, Form, Col } from 'react-bootstrap';

export default function CurrencyInput({ currencyType, name, onChange, label, required, value, className, md }) {
 
  return (
    <Form.Group as={Col} md={md}>
      <div className={`label-with-asteriks ${required ? "required" : " "}`}>
        <Form.Label className='fw-bold'>{label}</Form.Label>
      </div>
      <InputGroup>
        <FormControl className='border border-dark' type='number' step='0.01' min={0} required={required} name={name} value={value} onChange={onChange} aria-label="Dollar amount (with dot and two decimal places)" />
        <InputGroup.Text>{currencyType}</InputGroup.Text>
      </InputGroup>
    </Form.Group>
  )
}
