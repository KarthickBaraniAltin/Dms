import React, { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { InputNumber } from 'primereact/inputnumber'
import { Dropdown } from 'primereact/dropdown'

export default function TextDialog({ visible, hideDialog, inputs, handleInputChange, handleUpdate }) {
   const renderFooter = () => {
    return (
      <div>
          <Button label='Delete' icon='pi pi-times' className='p-button-danger' onClick={() => handleUpdate(true)} />
          <Button label='Update' icon='pi pi-check' onClick={() => handleUpdate()} autoFocus />
      </div>
    )
  }

  const columnSizes = [
    {label: 'Full Size', value: 'field col-12'},
    {label: 'Half Size', value: 'field col-6'}
  ]

  return (
    <div>
      <Dialog header='Text Component Dialog Header' visible={visible} style={{ width: '50vw' }} onHide={hideDialog} footer={renderFooter}>
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
          <h4 className='field col-12 md:col-12'>Column Size</h4>
          <div className='field col-12 md:col-12'>
            <label>Change Column Width</label>
            <Dropdown name='columnSize.value' value={inputs?.columnSize?.value ?? ''} options={columnSizes} onChange={handleInputChange} placeholder='Select a column size' />
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
        </div>
      </Dialog>
    </div>
  )
}
