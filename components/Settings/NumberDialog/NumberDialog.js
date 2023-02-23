import React from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { InputNumber } from 'primereact/inputnumber'
import LexicalEditor from '../../LexicalEditor/LexicalEditor';

export default function NumberDialog({ visible, hideDialog, name, inputs, handleInputChange, handleUpdate }) {
   const renderFooter = () => {
    return (
      <div>
          <Button label='Delete' icon='pi pi-times' className='p-button-danger' onClick={() => handleUpdate(true)} />
          <Button label='Update' icon='pi pi-check' onClick={() => handleUpdate()} autoFocus />
      </div>
    )
  }

  return (
    <div>
      <Dialog header='Number Component Dialog Header' visible={visible} style={{ width: '60vw' }} onHide={hideDialog} footer={renderFooter}>
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

          <h4 className='field col-12 md:col-12'>Validations</h4>
          <div className='field col-6 md:col-6'>
            <label>Min Number</label>
            <InputNumber name='validations.minNum.number' value={inputs?.validations?.minNum?.number ?? 0} onValueChange={handleInputChange} format={false}/>
          </div> {/* If onValueChange was onChange instead, the minNum in useValidation would be a string instead of a number. */}
          <div className='field col-6 md:col-6'>
            <label>Min Number Message</label>
            <InputText name='validations.minNum.message' value={inputs?.validations?.minNum?.message ?? ''} onChange={handleInputChange} />
          </div>
          <div className='field col-6 md:col-6'>
            <label>Max Number</label>
            <InputNumber name='validations.maxNum.number' value={inputs?.validations?.maxNum?.number ?? 1000} onValueChange={handleInputChange} format={false}/>
          </div> {/* If onValueChange was onChange instead, the maxNum in useValidation would be a string instead of a number. */}
          <div className='field col-6 md:col-6'>
            <label>Max Number Message</label>
            <InputText name='validations.maxNum.message' value={inputs?.validations?.maxNum?.message ?? ''} onChange={handleInputChange} />
          </div>

        </div>
      </Dialog>
    </div>
  )
}
