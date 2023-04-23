import React from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import LexicalEditor from '../../LexicalEditor/LexicalEditor';
import SettingsContainer from '../SettingsContainer/SettingsContainer'
import SettingsStyle from '../SettingsContainer/SettingsContainer.module.css'

export default function SubtitleDialog({ visible, hideDialog, name, inputs, assignValuesNested ,handleInputChange, handleUpdate }) {
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
          <label className={SettingsStyle.advanceMenuLabel}>Default Value</label>
          <InputText className={SettingsStyle.advanceMenuInput} name='defaultValue' value={inputs?.defaultValue ?? ''} onChange={handleInputChange} />
        </div>
      </div>
    </SettingsContainer>
  )


  // const renderFooter = () => {
  //   return (
  //     <div>
  //         <Button label='Delete' icon='pi pi-times' className='p-button-danger' onClick={() => handleUpdate(true)} />
  //         <Button label='Update' icon='pi pi-check' onClick={() => handleUpdate()} autoFocus />
  //     </div>
  //   )
  // }

  // return (
  //   <div>
  //     <Dialog header='Text Component Dialog Header' visible={visible} style={{ width: '65vw' }} onHide={hideDialog} footer={renderFooter}>
  //       <div className='grid p-fluid form-grid'>
  //         <div className='field col-6 md:col-6'>
  //           <label>Name</label>
  //           <InputText name='name' autoComplete='off' value={inputs?.name ?? ''} onChange={handleInputChange} />
  //         </div>
  //         <div className='field col-12 md:col-12'>
  //           <label>Subtitle</label>
  //           <LexicalEditor name='subtitle' value={inputs?.subtitle ?? ''} onChange={assignValuesNested} />
  //         </div>
  //         <div className='field col-6 md:col-6'>
  //           <label>Default Value</label>
  //           <InputText name='defaultValue' value={inputs?.defaultValue ?? ''} onChange={handleInputChange} />
  //         </div>
  //         {/* <h4 className='field col-12 md:col-12'>Validations</h4>
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
  //         </div> */}
  //       </div>
  //     </Dialog>
  //   </div>
  // )
}
