import React, { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import LexicalEditor from '../../LexicalEditor/LexicalEditor';

export default function DropdownDialog({ visible, hideDialog, name, inputs, assignValuesNested ,handleInputChange, handleUpdate }) {

    console.log("Inputs = ", inputs)

  const handleOptionChange = (index, event, type) => {
    if (!inputs.options) {
        return
    }

    const value = event.target.value
    const newOptions = [...inputs?.options]
    if (type === 'value') {
        newOptions[index] = { ...newOptions[index], value: value }
        assignValuesNested('options', newOptions)
    } else if (type === 'label') {
        newOptions[index] = { ...newOptions[index], label: value }
        assignValuesNested('options', newOptions)
    } else {
        console.error("Unknown Type")
    }
  }

  const handleDeleteOptions = (index) => {
    const newOptions = [...inputs?.options]
    newOptions.splice(index, 1)
    assignValuesNested('options', newOptions)
  }

  const handleAddOptions = () => {
    if (!inputs.options) {
        const newOptions = [{label: '', value: ''}]
        assignValuesNested('options', newOptions)
        return
    }

    const newOptions = [...inputs.options , {label: '', value: ''}]
    assignValuesNested('options', newOptions)
  }

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
      <Dialog header='Dropdown Component Dialog Header' visible={visible} style={{ width: '60vw' }} onHide={hideDialog} footer={renderFooter}>
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
          <h4 className='field col-12 md:col-12'>Options</h4>
          {
            inputs?.options?.map((option, index) => {
                return (
                    <>
                        <div className='col-6 md:col-6'>
                            <label>Label</label>
                            <InputText autoComplete='off' name={`option-${index}`} value={option.label} onChange={(event) => handleOptionChange(index, event, 'label')} />
                        </div>
                        <div className='col-5 md:col-5'>
                            <label>Value</label>
                            <InputText autoComplete='off' name={`option-${index}`} value={option.value} onChange={(event) => handleOptionChange(index, event, 'value')} />
                        </div>
                        <div className='col-1 md:col-1'>
                            <label style={{color: '#FFFFFF'}}>{'-asas'}</label>
                            <Button className='p-button-rounded p-button-danger' icon='pi pi-trash' onClick={() => handleDeleteOptions(index)} />
                        </div>
                    </>
                )
            })
          }
          <div className='field col-6 md:col-6'>
            <i className='pi pi-plus' onClick={() => handleAddOptions()}></i>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
