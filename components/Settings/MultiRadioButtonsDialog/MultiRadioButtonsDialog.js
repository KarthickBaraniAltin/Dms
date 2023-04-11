import React, { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import LexicalEditor from '../../LexicalEditor/LexicalEditor'
import Footer from '../Footer/Footer'
import ColumnSizeDropdowm from '../ColumnSizeDropdown/ColumnSizeDropdowm'
import RequiredCheckbox from '../RequiredCheckbox/RequiredCheckbox'
import { Dropdown } from 'primereact/dropdown'
import { Checkbox } from 'primereact/checkbox'

export default function MultiRadioButtonsDialog({ visible, hideDialog, inputs, assignValuesNested, handleInputChange, handleUpdate }) {
  const [otherChecked, setOtherChecked] = useState(inputs?.otherOptions.length === 0 ? false : true)

  const handleOptionChange = (index, event, type) => {
    if (!inputs.options) {
        return
    }

    const value = event.target.value
    const newOptions = [...inputs?.options]
    if (type === 'value') {
        newOptions[index] = { ...newOptions[index], value: value }
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
          const newOptions = [{value: ''}]
          assignValuesNested('options', newOptions)
          return
      }

      const newOptions = [...inputs.options , {value: ''}]
      assignValuesNested('options', newOptions)
  }

  const handleOtherOptions = (e) => {
    if (e.checked) {
      setOtherChecked(true)
      const newOtherOptions = [{value: 'Other:'}]
      assignValuesNested('otherOptions', newOtherOptions)
      return
    } else {

      setOtherChecked(false)
      const newOtherOptions = [...inputs?.otherOptions]
      newOtherOptions.splice(0, 1)
      assignValuesNested('otherOptions', newOtherOptions)
    }
  }

  const convertedOptions = inputs?.options.map((option, index) => {
    return `${index + 1}. ${option.value}`
  })

  const handleDefaultValue = (e) => {
    handleInputChange({target: {name: e.target.name, value: e.target.value[0] - 1}})
  }

  return (
    <div>
      <Dialog header='Multi Radio Buttons Component Dialog Header' visible={visible} style={{ width: '50vw' }} onHide={hideDialog} footer={<Footer handleUpdate={handleUpdate} />}>
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
            <Dropdown name='defaultValue' value={inputs?.defaultValue ?? ''} onChange={handleDefaultValue} options={convertedOptions} />
          </div>
          <h4 className='field col-12 md:col-12'>Column Size</h4>
          <div className='field col-12 md:col-12'>
            <ColumnSizeDropdowm name='divClassName' inputs={inputs} onChange={handleInputChange} />
          </div>
          <h4 className='field col-12 md:col-12'>Add Options</h4>
          {
            inputs?.options?.map((option, index) => {
                return (
                    <>
                        <div className='col-11 md:col-11'>
                            <label>Value</label>
                            <InputText autoComplete='off' name={`option-${index}`} value={option.value} onChange={(event) => handleOptionChange(index, event, 'value')} />
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
          <label className='mr-2'>Add Other Option</label>
          <Checkbox onChange={(e) => handleOtherOptions(e)} checked={otherChecked} />
          <h4 className='field col-12 md:col-12'>Validation</h4>
          <div className='field col-12 md:col-12'>
            <RequiredCheckbox inputs={inputs} onChange={handleInputChange} />
          </div>
        </div>
      </Dialog>
    </div>
  )
}