import React, { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import LexicalEditor from '../../LexicalEditor/LexicalEditor';
import Footer from '../Footer/Footer'
import { InputNumber } from 'primereact/inputnumber';
import { Checkbox } from 'primereact/checkbox';

export default function ImageDialog({ visible, hideDialog, inputs, assignValuesNested, handleInputChange, handleUpdate }) {

  return (
    <div>
      <Dialog header='Image Component Dialog Header' visible={visible} style={{ width: '60vw' }} onHide={hideDialog} footer={<Footer handleUpdate={handleUpdate} />}>
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
          <div className='field col-4 md:col-4'>
            <label>Width %</label>
            <InputNumber disabled name='width' value={inputs?.width ?? 0} onChange={handleInputChange} />
          </div>
          <div className='field col-4 md:col-4'>
            <label>Aspect Ratio</label>
            <InputNumber disabled name='aspectRatio' value={inputs?.height / inputs?.width} onChange={handleInputChange} />
          </div>
          <div className='field col-4 md:col-4'>
            <label>Height %</label>
            <InputNumber disabled name='height' value={inputs?.height ?? 0} onChange={handleInputChange} />
          </div>
          <div className='field col-12 md:col-12'>
            <label>Preserve Aspect Ratio</label>
            <Checkbox className='col-12 md:col-12' name='lockAspectRatio' checked={inputs?.lockAspectRatio ?? true} onChange={(e) => assignValuesNested('lockAspectRatio', e.checked)} />
          </div>
          {/* <div className='field col-12 md:col-12'>
            <ColumnSizeDropdowm name='divClassName' inputs={inputs} onChange={handleInputChange} />
          </div> */}
        </div>
      </Dialog>
    </div>
  )
}
