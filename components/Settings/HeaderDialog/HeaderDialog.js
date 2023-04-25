import React from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import Footer from '../Footer/Footer'
import LexicalEditor from '../../LexicalEditor/LexicalEditor';
import SettingsContainer from '../SettingsContainer/SettingsContainer'
import SettingsStyle from '../SettingsContainer/SettingsContainer.module.css'

export default function HeaderDialog({ visible, hideDialog, inputs, handleInputChange, handleUpdate, assignValuesNested }) {
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
      </div>
    </SettingsContainer>
  )

  // return (
  //   <div>
  //     <Dialog header='Header Component Dialog Header' visible={visible} style={{ width: '50vw' }} onHide={hideDialog} footer={<Footer handleUpdate={handleUpdate}/>}>
  //       <div className='grid p-fluid form-grid'>
  //         <div className='field col-6 md:col-6'>
  //           <label>Name</label>
  //           <InputText name='name' autoComplete='off' value={inputs?.name ?? ''} onChange={handleInputChange} />
  //         </div>
  //         <div className='field col-12 md:col-12'>
  //           <label>Subtitle</label>
  //           <LexicalEditor name='label' value={inputs?.label ?? ''} onChange={assignValuesNested} />
  //         </div> 
  //       </div>
  //     </Dialog>
  //   </div>
  // )
}
