import React from 'react'
import { InputText } from 'primereact/inputtext'
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
        <div>
        <label className={SettingsStyle.accordionContentLabel}>Subtitle: </label>
        <LexicalEditor name='subtitle' value={inputs?.subtitle ?? ''} onChange={assignValuesNested} />
        </div>
      </div>
    </SettingsContainer>
  )
}
