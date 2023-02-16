import React, { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { InputNumber } from 'primereact/inputnumber'
import { Dropdown } from 'primereact/dropdown'

export default function SignatureDialog({ visible, hideDialog, inputs, handleInputChange, handleUpdate }) {
   const renderFooter = () => {
    return (
      <div>
          <Button label='Delete' icon='pi pi-times' className='p-button-danger' onClick={() => handleUpdate(true)} />
          <Button label='Update' icon='pi pi-check' onClick={() => handleUpdate()} autoFocus />
      </div>
    )
  }

  const [font, setFont] = useState('')

  const fontOptions = [
    {label: 'Times New Roman', value: 'Times New Roman'},
    {label: 'Arial', value: 'Arial'},
    {label: 'Georgia', value: 'Georgia'},
    {label: 'Cursive', value: 'Cursive'},
    {label: 'Calibri' , value: 'Calibri'},
    {label: 'Courier New' , value: 'Courier New'},
    {label: 'Garamond' , value: 'Garamond' },
    {label: 'Helvetica' , value: 'Helvetica'},
    {label: 'Lato' , value: 'Lato'},
    {label: 'Lucida Sans' , value: 'Lucida Sans'},
    {label: 'Open Sans' , value: 'Open Sans'},
    {label: 'Oswald' , value: 'Oswald'},
    {label: 'Roboto' , value: 'Roboto'},
    {label: 'Poppins' , value: 'Poppins'},
    {label: 'Tahoma' , value: 'Tahoma'},
    {label: 'Trebuchet MS' , value: 'Trebuchet MS'},
    {label: 'Tangerine', value: 'Tangerine'}
  ]

  return (
    <div>
      <Dialog header='Signature Component Dialog Header' visible={visible} style={{ width: '50vw' }} onHide={hideDialog} footer={renderFooter}>
        <div className='grid p-fluid form-grid'>
          <div className='field col-6 md:col-6'>
            <label>Name</label>
            <InputText name='name' autoComplete='off' value={inputs?.name ?? ''} onChange={handleInputChange} />
          </div>
          <div className='field col-6 md:col-6'>
            <label>Label</label>
            <InputText name='label' value={inputs?.label ?? ''} onChange={handleInputChange} />
          </div>
          <div className='field col-6 md:col-6'>
            <label>Subtitle</label>
            <InputText name='subtitle' value={inputs?.subtitle ?? ''} onChange={handleInputChange} />
          </div>
          <div className='field col-6 md:col-6'>
            <label>Default Value</label>
            <InputText name='defaultValue' value={inputs?.defaultValue ?? ''} onChange={handleInputChange} />
          </div>
          <h4 className='field col-12 md:col-12'>Validations</h4>
          <div className='field col-6 md:col-6'>
            <label>Min Length</label>
            <InputNumber name='validations.minLength.length' value={inputs?.validations?.minLength?.length ?? 0} onChange={handleInputChange} />
          </div>
          <div className='field col-6 md:col-6'>
            <label>Min Length Message</label>
            <InputText name='validations.minLength.message' value={inputs?.validations?.minLength?.message ?? ''} onChange={handleInputChange} />
          </div>
          <div className='field col-6 md:col-6'>
            <label>Max Length</label>
            <InputNumber name='validations.maxLength.length' value={inputs?.validations?.maxLength?.length ?? 255} onChange={handleInputChange} />
          </div>
          <div className='field col-6 md:col-6'>
            <label>Max Length Message</label>
            <InputText name='validations.maxLength.message' value={inputs?.validations?.maxLength?.message ?? ''} onChange={handleInputChange} />
          </div>
          <div className='field col-6 md:col-6'>
            <label>Fonts</label>
            <Dropdown name='validations.fontFamily.font' value={inputs?.validations?.fontFamily?.font} options={fontOptions} onChange={handleInputChange} />
          </div>
        </div>
      </Dialog>
    </div>
  )
}
