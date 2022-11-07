import React from 'react'
import { Form, Col } from 'react-bootstrap'

export default function Selector({ options, multiple, defaultSelection, label, onChange, name, md, value, required }) {
      
    return (
        <Form.Group as={Col} className="mb-3" md={md}>
            <div className={`label-with-asteriks ${required ? "required" : " "}`}>
                <Form.Label className="fw-bold mb-2">{label}</Form.Label>
            </div>
            <Form.Select className='border border-dark' multiple={multiple ? multiple : false} required={required} value={value} name={name} onChange={onChange}>
                <option defaultValue={''} value={''}>{defaultSelection}</option>
                {options && options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>       
                ))}
            </Form.Select>
        </Form.Group>
    )
}
