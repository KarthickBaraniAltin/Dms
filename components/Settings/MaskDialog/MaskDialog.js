import React from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'

export default function MaskDialog({ visible, hideDialog, name, inputs, handleInputChange, handleUpdate }) {
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
      <Dialog header='Mask Component Dialog Header' visible={visible} style={{ width: '50vw' }} onHide={hideDialog} footer={renderFooter}>
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
          <h4 className='field col-12 md:col-12'>Validation</h4>
          <div className='field col-6 md:col-6'>
            <label>Set Mask</label>
            <InputText keyfilter={/[a9\*\(\)\-\s]/} name='validations.setMask.mask' value={inputs?.validations?.setMask?.mask ?? undefined} onChange={handleInputChange} />
            <small>{'a for alphabetic characters, 9 for numeric characters, * for alphanumeric characters, and (, ), and - for formatting.'}</small>
          </div>
          <div className='field col-6 md:col-6'>
            <label>Example Masks</label>
            <div className='flex flex-column'>
                <div>
                    <label>SSN: </label>
                    <div>999-99-9999</div>
                </div>
                <div>
                    <label>{'Phone Number (Default): '}</label>
                    <div>{'(999) 999-999'}</div>
                </div>
                <div>
                    <label>Serial: </label>
                    <div>a*-999-a999</div>
                </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
