import React from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { InputNumber } from 'primereact/inputnumber'
import { MultiSelect } from 'primereact/multiselect'
import { Checkbox } from 'primereact/checkbox';
import LexicalEditor from '../../LexicalEditor/LexicalEditor';
import { Dropdown } from 'primereact/dropdown'

export default function FileDialog({ visible, hideDialog, inputs, assignValuesNested, handleInputChange, handleUpdate }) {
   const renderFooter = () => {
    return (
      <div>
          <Button label='Delete' icon='pi pi-times' className='p-button-danger' onClick={() => handleUpdate(true)} />
          <Button label='Update' icon='pi pi-check' onClick={() => handleUpdate()} autoFocus />
      </div>
    )
  }

  const fileTypes = [
    {label: '.pdf', value: 'application/pdf'},
    {label: '.png', value: 'image/png'},
    {label: '.jpeg', value: 'image/jpeg' }
  ]

  const columnSizes = [
    {label: 'Full Size', value: 'field col-12'},
    {label: 'Half Size', value: 'field col-6'}
  ]

  return (
    <div>
      <Dialog header='File Component Dialog Header' visible={visible} style={{ width: '60vw' }} onHide={hideDialog} footer={renderFooter}>
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
            <label>Change Column Width</label>
            <Dropdown name='columnSize' value={inputs?.columnSize ?? ''} options={columnSizes} onChange={handleInputChange} placeholder='Select a column size' />
          </div>
          <div className='col-6'>
            <label>Multiple</label>
            <Checkbox name='multiple' className='ml-2' value={inputs?.multiple ?? false} onChange={handleInputChange} checked={inputs?.multiple} />
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
