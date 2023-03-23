import React from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import LexicalEditor from '../../LexicalEditor/LexicalEditor'
import ColumnSizeDropdowm from '../ColumnSizeDropdown/ColumnSizeDropdowm'
import Footer from '../Footer/Footer'

export default function TextDialog({ visible, hideDialog, inputs, assignValuesNested ,handleInputChange, handleUpdate }) {
  return (
    <div>
      <Dialog header='Text Component Dialog Header' visible={visible} style={{ width: '60vw' }} onHide={hideDialog} footer={<Footer handleUpdate={handleUpdate} />}>
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
            <ColumnSizeDropdowm name='divClassName' inputs={inputs} onChange={handleInputChange} />
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
