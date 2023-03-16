import React, { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { InputNumber } from 'primereact/inputnumber'
import { MultiSelect } from 'primereact/multiselect'
import { Checkbox } from 'primereact/checkbox';
import LexicalEditor from '../../LexicalEditor/LexicalEditor';
import { Dropdown } from 'primereact/dropdown'
import Footer from '../Footer/Footer'
import ColumnSizeDropdowm from '../ColumnSizeDropdown/ColumnSizeDropdowm'

export default function FileDialog({ visible, hideDialog, inputs, assignValuesNested, handleInputChange, handleUpdate }) {
  
  const fileTypes = [
    {label: '.pdf', value: 'application/pdf'},
    {label: '.png', value: 'image/png'},
    {label: '.jpeg', value: 'image/jpeg' }
  ]

  const [isMultipleChecked, setIsMultipleChecked] = useState(false)

  const handleFileChange = () => {
    setIsMultipleChecked(prevState => !prevState)
    
    if (inputs?.multiple) {
      inputs.multiple = false
    } else {
      inputs.multiple = true
    }
  }

  return (
    <div>
      <Dialog header='File Component Dialog Header' visible={visible} style={{ width: '60vw' }} onHide={hideDialog} footer={<Footer handleUpdate={handleUpdate} />}>
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
          <div className='field col-12 md:col-12'>
            <ColumnSizeDropdowm name='divClassName' inputs={inputs} onChange={handleInputChange} />
          </div>
          <div className='col-6'>
            <label>Multiple</label>
            <Checkbox name='multiple' className='ml-2' value={inputs?.multiple ?? false} onChange={handleFileChange} checked={isMultipleChecked} />
          </div>
          <h4 className='field col-12 md:col-12'>Validations</h4>
          <div className='field col-6 md:col-6'>
            <label>Min File Size</label>
            <InputNumber name='validations.minFile.fileSize' value={inputs?.validations?.minFile?.fileSize ?? 0} onChange={handleInputChange} format={false}/>
          </div>
          <div className='field col-6 md:col-6'>
            <label>Min File Message</label>
            <InputText name='validations.minFile.message' value={inputs?.validations?.minFile?.message ?? ''} onChange={handleInputChange} />
          </div>
          <div className='field col-6 md:col-6'>
            <label>Max File Size</label>
            <InputNumber name='validations.maxFile.fileSize' value={inputs?.validations?.maxFile?.fileSize ?? 0} onChange={handleInputChange} format={false}/>
          </div>
          <div className='field col-6 md:col-6'>
            <label>Max File Message</label>
            <InputText name='validations.maxFile.message' value={inputs?.validations?.maxFile?.message ?? ''} onChange={handleInputChange} />
          </div>
          <div className='field col-6 md:col-6'>
            <label>Acceptable File Types</label>
              <MultiSelect name='validations.fileTypes.fileTypes' value={inputs?.validations?.fileTypes?.fileTypes ?? null} options={fileTypes} onChange={handleInputChange} />
          </div>
          <div className='field col-6 md:col-6'>
            <label>File Types Message</label>
            <InputText name='validations.fileTypes.message' value={inputs?.validations?.fileTypes?.message ?? ''} onChange={handleInputChange} />
          </div>
        </div>
      </Dialog>
    </div>
  )
}
