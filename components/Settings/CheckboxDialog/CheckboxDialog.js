import React, { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import LexicalEditor from '../../LexicalEditor/LexicalEditor'
import Footer from '../Footer/Footer'
import ColumnSizeDropdowm from '../ColumnSizeDropdown/ColumnSizeDropdowm'
import RequiredCheckbox from '../RequiredCheckbox/RequiredCheckbox'
import { MultiSelect } from 'primereact/multiselect'
import useDialogValidations from '../../../hooks/useDialogValidations'
import SettingsContainer from '../SettingsContainer/SettingsContainer'
import SettingsStyle from '../SettingsContainer/SettingsContainer.module.css'

export default function CheckboxDialog({ visible, hideDialog, inputs, assignValuesNested, handleInputChange, handleUpdate }) {
  const [invalidOptions, setInvalidOptions] = useState(false)
  const { invalidDefaultValues } = useDialogValidations()

  const handleOptionChange = (index, event, type) => {
    if (!inputs.options) {
        return
    }

    const value = event.target.value
    const newOptions = [...inputs?.options]

    if (!newOptions.some(option => option.label === inputs?.defaultValue)) {
      inputs.defaultValue = null
    }

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

  const convertedOptions = inputs?.options.map(option => option.value)

  return (
    <SettingsContainer inputs={inputs} handleInputChange={handleInputChange} hideMenu={hideDialog} handleUpdate={handleUpdate}
    options={inputs?.options} setInvalidOptions={setInvalidOptions}
    >
      <div className={SettingsStyle.accordionContent} style={{display: 'flex', flexDirection: 'column', rowGap: '1rem'}}>
        <div>
          <label className={SettingsStyle.advanceMenuLabel}>Name</label>
          <InputText className={SettingsStyle.advanceMenuInput} name='name' autoComplete='off' value={inputs?.name ?? ''} onChange={handleInputChange} />
        </div>
        {/* <div>
          <label>Subtitle</label>
          <LexicalEditor name='subtitle' value={inputs?.subtitle ?? ''} onChange={assignValuesNested} />
        </div> */}
        <div>
          <label className={SettingsStyle.advanceMenuLabel}>Default Value</label>
          <MultiSelect className={SettingsStyle.advanceMenuInput} name='defaultValue' value={inputs?.defaultValue ?? ''} onChange={handleInputChange}
          options={convertedOptions} disabled={invalidDefaultValues(inputs?.options)}
          />
        </div>
        <div>
          <ColumnSizeDropdowm name='divClassName' inputs={inputs} onChange={handleInputChange} />
        </div>
        <label className={SettingsStyle.advanceMenuLabel}>Options</label>
        {
          inputs?.options?.map((option, index) => {
              return (
                  <div style={{marginBottom: '0.5rem'}}>
                      <div style={{display: 'flex', columnGap: '0.25rem', alignItems: 'center', flexWrap: 'wrap'}}>
                          <label className={SettingsStyle.advanceMenuLabel}>Value</label>
                          <InputText autoComplete='off' name={`option-${index}`} value={option.value} onChange={(event) => handleOptionChange(index, event, 'value')} />
                          <Button className='p-button-rounded p-button-danger' icon='pi pi-trash' onClick={() => handleDeleteOptions(index)} />
                      </div>
                      <small style={{color: 'red'}}>{invalidOptions && option.value === '' ? 'Value Required' : ''}</small>
                  </div>
              )
          })
        }
        <div>
          <i style={{color: '#F7F7F7'}} className='pi pi-plus' onClick={() => handleAddOptions()}></i>
        </div>
      </div>
    </SettingsContainer>
  )

  // return (
  //   <div>
  //     <Dialog header='Checkbox Component Dialog Header' visible={visible} style={{ width: '50vw' }} onHide={hideDialog}
  //     footer={<Footer handleUpdate={handleUpdate} options={inputs?.options} setInvalidOptions={setInvalidOptions} />}>
  //       <div className='grid p-fluid form-grid'>
  //         <div className='field col-6 md:col-6'>
  //           <label>Name</label>
  //           <InputText name='name' autoComplete='off' value={inputs?.name ?? ''} onChange={handleInputChange} />
  //         </div>
  //         <div className='field col-6 md:col-6'>
  //           <label>Label</label>
  //           <InputText name='label' value={inputs?.label ?? ''} onChange={handleInputChange} />
  //         </div>
  //         <div className='field col-12 md:col-12'>
  //           <label>Subtitle</label>
  //           <LexicalEditor name='subtitle' value={inputs?.subtitle ?? ''} onChange={assignValuesNested} />
  //         </div>
  //         <div className='field col-12 md:col-12'>
  //             <label>Default Value</label>
  //             <MultiSelect name='defaultValue' value={inputs?.defaultValue ?? ''} onChange={handleInputChange}
  //             options={convertedOptions} disabled={invalidDefaultValues(inputs?.options)}
  //             />
  //         </div>
  //         <h4 className='field col-12 md:col-12'>Column Size</h4>
  //         <div className='field col-12 md:col-12'>
  //           <ColumnSizeDropdowm name='divClassName' inputs={inputs} onChange={handleInputChange} />
  //         </div>
  //         <h4 className='field col-12 md:col-12'>Options</h4>
  //         {
  //           inputs?.options?.map((option, index) => {
  //               return (
  //                   <>
  //                       <div className='col-11 md:col-11'>
  //                           <label>Value</label>
  //                           <InputText autoComplete='off' name={`option-${index}`} value={option.value} onChange={(event) => handleOptionChange(index, event, 'value')} />
  //                           <small style={{color: 'red'}}>{invalidOptions && option.value === '' ? 'Value Required' : ''}</small>
  //                       </div>
  //                       <div className='col-1 md:col-1'>
  //                           <Button className='p-button-rounded p-button-danger mt-4' icon='pi pi-trash' onClick={() => handleDeleteOptions(index)} />
  //                       </div>
  //                   </>
  //               )
  //           })
  //         }
  //         <div className='field col-6 md:col-6'>
  //           <i className='pi pi-plus' onClick={() => handleAddOptions()}></i>
  //         </div>
  //         <h4 className='field col-12 md:col-12'>Validation</h4>
  //         <div className='field col-12 md:col-12'>
  //           <RequiredCheckbox inputs={inputs} onChange={handleInputChange} />
  //         </div>
  //       </div>
  //     </Dialog>
  //   </div>
  // )
}