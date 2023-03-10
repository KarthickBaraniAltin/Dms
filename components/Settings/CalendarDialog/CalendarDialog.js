import React from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import LexicalEditor from '../../LexicalEditor/LexicalEditor';
import { Dropdown } from 'primereact/dropdown'

export default function CalendarDialog({ visible, hideDialog, assignValuesNested, inputs, handleInputChange, handleUpdate }) {
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
      <Dialog header='Calendar Component Dialog Header' visible={visible} style={{ width: '60vw' }} onHide={hideDialog} footer={renderFooter}>
        <div className='grid p-fluid form-grid'>
          <div className='field col-6 md:col-6'>
            <label>Name</label>
            <InputText name='name' autoComplete='off' value={inputs?.name ?? ''} onChange={handleInputChange} />
          </div>
          <div className='field col-6 md:col-6'>
            <label>Label</label>
            <InputText name='label' value={inputs?.label ?? ''} onChange={handleInputChange} />
          </div>
          <div className='field col-12 md:col-12'>
            <label>Subtitle</label>
            <LexicalEditor name='subtitle' value={inputs?.subtitle ?? ''} onChange={assignValuesNested} />
          </div>
          <div className='field col-6 md:col-6'>
            <label>Default Value</label>
            <InputText name='defaultValue' value={inputs?.defaultValue ?? ''} onChange={handleInputChange} />
          </div>
          <h4 className='field col-12 md:col-12'>Column Size</h4>
          <div className='field col-12 md:col-12'>
            <label>Change Column Width</label>
            <Dropdown name='columnSize' value={inputs?.columnSize ?? ''} options={columnSizes} onChange={handleInputChange} placeholder='Select a column size' />
          </div>
          <h4 className='field col-12 md:col-12'>Validations</h4>
          <div className='field col-6 md:col-6'>
            <label>Min Date</label>
            <Calendar name='validations.minDate.date' value={inputs?.validations?.minDate?.date ?? undefined} onChange={handleInputChange} />
          </div>
          <div className='field col-6 md:col-6'>
            <label>Min Date Message</label>
            <InputText name='validations.minDate.message' value={inputs?.validations?.minDate?.message ?? ''} onChange={handleInputChange} />
          </div>
          <div className='field col-6 md:col-6'>
            <label>Max Date</label>
            <Calendar name='validations.maxDate.date' value={inputs?.validations?.maxDate?.date ?? undefined} onChange={handleInputChange} />
          </div>
          <div className='field col-6 md:col-6'>
            <label>Max Date Message</label>
            <InputText name='validations.maxDate.message' value={inputs?.validations?.maxDate?.message ?? ''} onChange={handleInputChange} />
          </div>
        </div>
      </Dialog>
    </div>
  )
}
