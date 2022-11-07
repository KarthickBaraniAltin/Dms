import React from 'react'
import { Form, Col } from 'react-bootstrap'

const DisabledInput= ({ label, type, placeholder, md, value}) => {
  
  return (
    <Form.Group as={Col} md={md}>
        <Form.Label className='fw-bold'>{label}</Form.Label>
        <Form.Control placeholder={placeholder} type={type ? type : "text"} value={value} disabled/>
    </Form.Group>
  )
}

export default DisabledInput;
