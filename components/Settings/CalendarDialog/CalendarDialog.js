import React from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import LexicalEditor from '../../LexicalEditor/LexicalEditor'
import Footer from '../Footer/Footer'
import ColumnSizeDropdowm from '../ColumnSizeDropdown/ColumnSizeDropdowm'
import RequiredCheckbox from '../RequiredCheckbox/RequiredCheckbox'
import SettingsContainer from '../SettingsContainer/SettingsContainer'
import SettingsStyle from '../SettingsContainer/SettingsContainer.module.css'

export default function CalendarDialog({ visible, hideDialog, assignValuesNested, inputs, handleInputChange, handleUpdate }) {
  return (
    <SettingsContainer inputs={inputs} handleInputChange={handleInputChange} hideMenu={hideDialog} handleUpdate={handleUpdate}>
      <div className={SettingsStyle.accordionContent} style={{display: 'flex', flexDirection: 'column', rowGap: '1rem'}}>
        <div>
          <label className={SettingsStyle.advanceMenuLabel}>Name</label>
          <InputText className={SettingsStyle.advanceMenuInput} name='name' autoComplete='off' value={inputs?.name ?? ''} onChange={handleInputChange} />
        </div>
        {/* <div>
        <label className={SettingsStyle.accordionContentLabel}>Subtitle: </label>
        <LexicalEditor name='subtitle' value={inputs?.subtitle ?? ''} onChange={assignValuesNested} />
        </div> */}
        <div>
          <label className={SettingsStyle.advanceMenuLabel}>Default Value</label>
          <Calendar className={SettingsStyle.advanceMenuInput} name='defaultValue' value={inputs?.defaultValue ?? ''} onChange={handleInputChange} />
        </div>
        <div>
          <ColumnSizeDropdowm name='divClassName' inputs={inputs} onChange={handleInputChange} />
        </div>
        <div>
          <label className={SettingsStyle.advanceMenuLabel}>Min Date</label>
          <Calendar className={SettingsStyle.advanceMenuInput} name='validations.minDate.date' value={inputs?.validations?.minDate?.date ?? undefined} onChange={handleInputChange} />
        </div>
        <div>
          <label className={SettingsStyle.advanceMenuLabel}>Min Date Message</label>
          <InputText className={SettingsStyle.advanceMenuInput} name='validations.minDate.message' value={inputs?.validations?.minDate?.message ?? ''} onChange={handleInputChange} />
        </div>
        <div>
          <label className={SettingsStyle.advanceMenuLabel}>Max Date</label>
          <Calendar className={SettingsStyle.advanceMenuInput} name='validations.maxDate.date' value={inputs?.validations?.maxDate?.date ?? undefined} onChange={handleInputChange} />
        </div>
        <div>
          <label className={SettingsStyle.advanceMenuLabel}>Max Date Message</label>
          <InputText className={SettingsStyle.advanceMenuInput} name='validations.maxDate.message' value={inputs?.validations?.maxDate?.message ?? ''} onChange={handleInputChange} />
        </div>
      </div>
    </SettingsContainer>
  ) 
}
//   return (
//     <div>
//       <Dialog header='Calendar Component Dialog Header' visible={visible} style={{ width: '60vw' }} onHide={hideDialog} footer={<Footer handleUpdate={handleUpdate} />}>
//         <div className='grid p-fluid form-grid'>
//           <div className='field col-6 md:col-6'>
//             <label>Name</label>
//             <InputText name='name' autoComplete='off' value={inputs?.name ?? ''} onChange={handleInputChange} />
//           </div>
//           <div className='field col-6 md:col-6'>
//             <label>Label</label>
//             <InputText name='label' value={inputs?.label ?? ''} onChange={handleInputChange} />
//           </div>
//           <div className='field col-12 md:col-12'>
//             <label>Subtitle</label>
//             <LexicalEditor name='subtitle' value={inputs?.subtitle ?? ''} onChange={assignValuesNested} />
//           </div>
//           <div className='field col-6 md:col-6'>
//             <label>Default Value</label>
//             <Calendar name='defaultValue' value={inputs?.defaultValue ?? ''} onChange={handleInputChange} />
//           </div>
//           <h4 className='field col-12 md:col-12'>Column Size</h4>
//           <div className='field col-12 md:col-12'>
//             <ColumnSizeDropdowm name='divClassName' inputs={inputs} onChange={handleInputChange} />
//           </div>
//           <h4 className='field col-12 md:col-12'>Validations</h4>
//           <div className='field col-12 md:col-12'>
//             <RequiredCheckbox inputs={inputs} onChange={handleInputChange} />
//           </div>
//           <div className='field col-6 md:col-6'>
//             <label>Min Date</label>
//             <Calendar name='validations.minDate.date' value={inputs?.validations?.minDate?.date ?? undefined} onChange={handleInputChange} />
//           </div>
//           <div className='field col-6 md:col-6'>
//             <label>Min Date Message</label>
//             <InputText name='validations.minDate.message' value={inputs?.validations?.minDate?.message ?? ''} onChange={handleInputChange} />
//           </div>
//           <div className='field col-6 md:col-6'>
//             <label>Max Date</label>
//             <Calendar name='validations.maxDate.date' value={inputs?.validations?.maxDate?.date ?? undefined} onChange={handleInputChange} />
//           </div>
//           <div className='field col-6 md:col-6'>
//             <label>Max Date Message</label>
//             <InputText name='validations.maxDate.message' value={inputs?.validations?.maxDate?.message ?? ''} onChange={handleInputChange} />
//           </div>
//         </div>
//       </Dialog>
//     </div>
//   )
// }