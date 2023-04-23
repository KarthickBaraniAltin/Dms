import React from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import LexicalEditor from '../../LexicalEditor/LexicalEditor'
import { Dropdown } from 'primereact/dropdown'
import Footer from '../Footer/Footer'
import ColumnSizeDropdowm from '../ColumnSizeDropdown/ColumnSizeDropdowm'
import RequiredCheckbox from '../RequiredCheckbox/RequiredCheckbox'
import SettingsContainer from '../SettingsContainer/SettingsContainer'
import SettingsStyle from '../SettingsContainer/SettingsContainer.module.css'

export default function SignatureDialog({ visible, hideDialog, inputs, assignValuesNested, handleInputChange, handleUpdate }) {

  const fontOptions = [
    {label: 'Times New Roman', value: 'Times New Roman'},
    {label: 'Arial', value: 'Arial'},
    {label: 'Georgia', value: 'Georgia'},
    {label: 'Cursive', value: 'Cursive'},
    {label: 'Calibri' , value: 'Calibri'},
    {label: 'Tangerine', value: 'Tangerine'}
  ]  

  return (
    <SettingsContainer inputs={inputs} handleInputChange={handleInputChange} hideMenu={hideDialog} handleUpdate={handleUpdate}>
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
          <ColumnSizeDropdowm name='divClassName' inputs={inputs} onChange={handleInputChange} />
        </div>
        <div>
          <label className={SettingsStyle.advanceMenuLabel}>Min Length</label>
          <InputNumber className={SettingsStyle.advanceMenuInput} name='validations.minLength.length' value={inputs?.validations?.minLength?.length ?? 0} onChange={handleInputChange} />
        </div>
        <div>
          <label className={SettingsStyle.advanceMenuLabel}>Min Length Message</label>
          <InputText className={SettingsStyle.advanceMenuInput} name='validations.minLength.message' value={inputs?.validations?.minLength?.message ?? ''} onChange={handleInputChange} />
        </div>
        <div>
          <label className={SettingsStyle.advanceMenuLabel}>Max Length</label>
          <InputNumber className={SettingsStyle.advanceMenuInput} name='validations.maxLength.length' value={inputs?.validations?.maxLength?.length ?? 255} onChange={handleInputChange} />
        </div>
        <div>
          <label className={SettingsStyle.advanceMenuLabel}>Max Length Message</label>
          <InputText className={SettingsStyle.advanceMenuInput} name='validations.maxLength.message' value={inputs?.validations?.maxLength?.message ?? ''} onChange={handleInputChange} />
        </div>
        <div>
          <label className={SettingsStyle.advanceMenuLabel}>Fonts</label>
          <Dropdown className={SettingsStyle.advanceMenuInput} name='validations.fontFamily.font' value={inputs?.validations?.fontFamily?.font} options={fontOptions} onChange={handleInputChange} />
        </div>
      </div>
    </SettingsContainer>
  )

  // return (
  //   <div>
  //     <Dialog header='Signature Component Dialog Header' visible={visible} style={{ width: '50vw' }} onHide={hideDialog} footer={<Footer handleUpdate={handleUpdate} />}>
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
  //         <h4 className='field col-12 md:col-12'>Column Size</h4>
  //         <div className='field col-12 md:col-12'>
  //           <ColumnSizeDropdowm name='divClassName' inputs={inputs} onChange={handleInputChange} />
  //         </div>
  //         <h4 className='field col-12 md:col-12'>Validations</h4>
  //         <div className='field col-12 md:col-12'>
  //           <RequiredCheckbox inputs={inputs} onChange={handleInputChange} />
  //         </div>
  //         <div className='field col-6 md:col-6'>
  //           <label>Min Length</label>
  //           <InputNumber name='validations.minLength.length' value={inputs?.validations?.minLength?.length ?? 0} onChange={handleInputChange} />
  //         </div>
  //         <div className='field col-6 md:col-6'>
  //           <label>Min Length Message</label>
  //           <InputText name='validations.minLength.message' value={inputs?.validations?.minLength?.message ?? ''} onChange={handleInputChange} />
  //         </div>
  //         <div className='field col-6 md:col-6'>
  //           <label>Max Length</label>
  //           <InputNumber name='validations.maxLength.length' value={inputs?.validations?.maxLength?.length ?? 255} onChange={handleInputChange} />
  //         </div>
  //         <div className='field col-6 md:col-6'>
  //           <label>Max Length Message</label>
  //           <InputText name='validations.maxLength.message' value={inputs?.validations?.maxLength?.message ?? ''} onChange={handleInputChange} />
  //         </div>
  //         <div className='field col-6 md:col-6'>
  //           <label>Fonts</label>
  //           <Dropdown name='validations.fontFamily.font' value={inputs?.validations?.fontFamily?.font} options={fontOptions} onChange={handleInputChange} />
  //         </div>
  //       </div>
  //     </Dialog>
  //   </div>
  // )
}
