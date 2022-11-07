import React from 'react'
import { Form, Col, InputGroup } from 'react-bootstrap';

export default function InputWithGroupText({defaultValue, groupText, maxLength, minLength, style, value, disabled, type, name, label, placeholder, autocomplate,md, onChange, size, required, onInput, min, max, step, errorMessage}) {
  return (
      <Form.Group as={Col} md={md}>
            <div className={`label-with-asteriks ${required ? "required" : " "}`}>
              <Form.Label className='fw-bold'>{label}</Form.Label>
            </div>
            <InputGroup hasValidation>
                <InputGroup.Text>{groupText}</InputGroup.Text>
                <Form.Control name={name} className="border border-dark" maxLength={maxLength} value={value} size={size} autoComplete={autocomplate} min={min} max={max} required={required} type={type ? type: 'text'} step={step} placeholder={placeholder} onInput={onInput} onChange={onChange} isInvalid={errorMessage} disabled={disabled ? disabled : false} defaultValue={defaultValue} />
                <Form.Control.Feedback type='invalid'>
                  {errorMessage}
                </Form.Control.Feedback>
            </InputGroup>
      </Form.Group>
  )
}
