import React, { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import LexicalEditor from '../../LexicalEditor/LexicalEditor'
import ColumnSizeDropdowm from '../ColumnSizeDropdown/ColumnSizeDropdowm'
import Footer from '../Footer/Footer'
import RequiredCheckbox from '../RequiredCheckbox/RequiredCheckbox'
import { Dropdown } from 'primereact/dropdown'
import { MultiSelect } from 'primereact/multiselect'

export default function DropdownDialog({ visible, hideDialog, inputs, assignValuesNested ,handleInputChange, handleUpdate }) {
  const [blankOptions, setBlankOptions] = useState(false)

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

  const noInputStyle = {
    border: '1px solid red',
    boxShadow: '0 0 4px rgba(240, 240, 240, 0.2)',
    borderRadius: '4px'
  }

  return (
    <div>
      <Dialog header='Dropdown Component Dialog Header' visible={visible} style={{ width: '60vw' }} onHide={hideDialog}
        footer={<Footer handleUpdate={handleUpdate} options={inputs?.options} setBlankOptions={setBlankOptions} />}
      >
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
          <div className='field col-12 md:col-12'>
            <label>Default Value</label>
            {inputs?.name.startsWith('dropdown') ? 
              <Dropdown name='defaultValue' value={inputs?.defaultValue ?? ''} onChange={handleInputChange} options={inputs?.options} />
              :
              <MultiSelect name='defaultValue' value={inputs?.defaultValue ?? ''} onChange={handleInputChange} options={inputs?.options} />
            }
          </div>
          <h4 className='field col-12 md:col-12'>Column Size</h4>
          <div className='field col-12 md:col-12'>
            <ColumnSizeDropdowm name='divClassName' inputs={inputs} onChange={handleInputChange} />
          </div>
          <h4 className='field col-12 md:col-12'>Options</h4>
          {
            inputs?.options?.map((option, index) => {
                return (
                    <>
                        <div className='col-6 md:col-6'>
                            <label>Label</label>
                            <InputText autoComplete='off' name={`option-${index}`} value={option.label} onChange={(event) => handleOptionChange(index, event, 'label')} />
                            <small style={{color: 'red'}}>{blankOptions && option.label === '' ? 'Label Required' : ''}</small>
                        </div>
                        <div className='col-5 md:col-5'>
                            <label>Value</label>
                            <InputText autoComplete='off' name={`option-${index}`} value={option.value} onChange={(event) => handleOptionChange(index, event, 'value')} />
                            <small style={{color: 'red'}}>{blankOptions && option.value === '' ? 'Value Required' : ''}</small>
                        </div>
                        <div className='col-1 md:col-1'>
                            <Button className='p-button-rounded p-button-danger mt-4' icon='pi pi-trash' onClick={() => handleDeleteOptions(index)} />
                        </div>
                    </>
                )
            })
          }
          <div className='field col-6 md:col-6'>
            <i className='pi pi-plus' onClick={() => handleAddOptions()}></i>
          </div>
          <h4 className='field col-12 md:col-12'>Validation</h4>
          <div className='field col-12 md:col-12'>
            <RequiredCheckbox inputs={inputs} onChange={handleInputChange} />
          </div>
        </div>
      </Dialog>
    </div>
  )
}
