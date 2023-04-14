import React from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import Footer from '../Footer/Footer'
import LexicalEditor from '../../LexicalEditor/LexicalEditor';

export default function HeaderDialog({ visible, hideDialog, inputs, handleInputChange, handleUpdate, assignValuesNested }) {

  return (
    <div>
      <Dialog header='Header Component Dialog Header' visible={visible} style={{ width: '50vw' }} onHide={hideDialog} footer={<Footer handleUpdate={handleUpdate}/>}>
        <div className='grid p-fluid form-grid'>
          <div className='field col-6 md:col-6'>
            <label>Name</label>
            <InputText name='name' autoComplete='off' value={inputs?.name ?? ''} onChange={handleInputChange} />
          </div>
          <div className='field col-12 md:col-12'>
            <label>Subtitle</label>
            <LexicalEditor name='label' value={inputs?.label ?? ''} onChange={assignValuesNested} />
          </div> 
        </div>
      </Dialog>
    </div>
  )
}
