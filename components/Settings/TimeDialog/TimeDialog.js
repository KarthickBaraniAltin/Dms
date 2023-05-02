import React from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import LexicalEditor from '../../LexicalEditor/LexicalEditor';
import { Dropdown } from 'primereact/dropdown'
import Footer from '../Footer/Footer'
import ColumnSizeDropdowm from '../ColumnSizeDropdown/ColumnSizeDropdowm'
import RequiredCheckbox from '../RequiredCheckbox/RequiredCheckbox'

export default function TimeDialog({ visible, hideDialog, assignValuesNested, inputs, handleInputChange, handleUpdate }) {
  return (
    <div>
      <Dialog header='Calendar Component Dialog Header' visible={visible} style={{ width: '60vw' }} onHide={hideDialog} footer={<Footer handleUpdate={handleUpdate} />}>
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
            <Calendar showTime timeOnly hourFormat='12' name='defaultValue' value={inputs?.defaultValue ?? ''} onChange={handleInputChange} />
          </div>
          <h4 className='field col-12 md:col-12'>Column Size</h4>
          <div className='field col-12 md:col-12'>
            <ColumnSizeDropdowm name='divClassName' inputs={inputs} onChange={handleInputChange} />
          </div>
          <h4 className='field col-12 md:col-12'>Validations</h4>
          <div className='field col-12 md:col-12'>
            <RequiredCheckbox inputs={inputs} onChange={handleInputChange} />
          </div>
          <div className='field col-6 md:col-6'>
            <label>Min Time</label>
            <Calendar showTime timeOnly hourFormat='12' name='validations.minTime.time' value={inputs?.validations?.minTime?.time ?? undefined} onChange={handleInputChange} />
          </div>
          <div className='field col-6 md:col-6'>
            <label>Min Time Message</label>
            <InputText name='validations.minTime.message' value={inputs?.validations?.minTime?.message ?? ''} onChange={handleInputChange} />
          </div>
          <div className='field col-6 md:col-6'>
            <label>Max Time</label>
            <Calendar showTime timeOnly hourFormat='12' name='validations.maxTime.time' value={inputs?.validations?.maxTime?.time ?? undefined} onChange={handleInputChange} />
          </div>
          <div className='field col-6 md:col-6'>
            <label>Max Time Message</label>
            <InputText name='validations.maxTime.message' value={inputs?.validations?.maxTime?.message ?? ''} onChange={handleInputChange} />
          </div>
        </div>
      </Dialog>
    </div>
  )
}