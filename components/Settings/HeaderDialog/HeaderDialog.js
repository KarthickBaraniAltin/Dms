import React, { useState, useEffect } from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { InputNumber } from 'primereact/inputnumber'

export default function HeaderDialog({ visible, hideDialog, inputs, handleInputChange, handleUpdate }) {
    const [metMinLength, setMetMinLength] = useState(true)
    const [metMaxLength, setMetMaxLength] = useState(true)

    useEffect(() => {
        if (inputs?.label.length < inputs?.validations?.minLength?.length) {
            setMetMinLength(false)
        } else {
            setMetMinLength(true)
        }
        if (inputs?.label.length > inputs?.validations?.maxLength.length) {
            setMetMaxLength(false)
        } else {
            setMetMaxLength(true)
        }
    }, [inputs?.validations?.minLength?.length, inputs?.validations?.maxLength?.length, inputs?.label])

   const renderFooter = () => {
    return (
      <div>
          {metMinLength && metMaxLength ?
            <Button label='Update' icon='pi pi-check' onClick={() => handleUpdate()} autoFocus />
            :
            <Button label='Update' icon='pi pi-check' disabled />
          }
      </div>
    )
  }

  return (
    <div>
      <Dialog header='Header Component Dialog Header' visible={visible} style={{ width: '50vw' }} onHide={hideDialog} footer={renderFooter}>
        <div className='grid p-fluid form-grid'>
          <div className='field col-6 md:col-6'>
            <label>Name</label>
            <InputText name='name' autoComplete='off' value={inputs?.name ?? ''} onChange={handleInputChange} />
          </div>
          <div className='field col-6 md:col-6'>
            <label>Label</label>
            <InputText className={metMinLength && metMaxLength ? null : 'p-invalid'} name='label' value={inputs?.label ?? ''} onChange={handleInputChange} />
          </div>
          <h4 className='field col-12 md:col-12'>Validations</h4>
          <div className='field col-6 md:col-6'>
            <label>Min Length</label>
            <InputNumber name='validations.minLength.length' value={inputs?.validations?.minLength?.length ?? 0} onChange={handleInputChange} />
          </div>
          <div className='field col-6 md:col-6'>
            <label>Max Length</label>
            <InputNumber name='validations.maxLength.length' value={inputs?.validations?.maxLength?.length ?? 255} onChange={handleInputChange} />
          </div>
        </div>
      </Dialog>
    </div>
  )
}
