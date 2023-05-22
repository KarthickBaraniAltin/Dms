import React from 'react'
import { InputText } from 'primereact/inputtext'
import LexicalEditor from '../../LexicalEditor/LexicalEditor';
import SettingsContainer from '../SettingsContainer/SettingsContainer'
import SettingsStyle from '../SettingsContainer/SettingsContainer.module.css'

export default function ImageDialog({ visible, hideDialog, inputs, assignValuesNested, handleInputChange, handleUpdate }) {
  return (
    <SettingsContainer inputs={inputs} handleInputChange={handleInputChange} hideMenu={hideDialog} handleUpdate={handleUpdate}>
      <div className={SettingsStyle.accordionContent} style={{ display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
        <div>
          <label className={SettingsStyle.advanceMenuLabel}>Name</label>
          <InputText name='name' autoComplete='off' value={inputs?.name ?? ''} onChange={handleInputChange} />
        </div>
        <div>
          <label>Subtitle</label>
          <LexicalEditor name='subtitle' value={inputs?.subtitle ?? ''} onChange={assignValuesNested} />
        </div>
        <div>
          <label className={SettingsStyle.advanceMenuLabel}>Width %</label>
          <InputText className={SettingsStyle.advanceMenuInput} disabled name='width' value={inputs?.width ?? 0} onChange={handleInputChange} />
        </div>
        <div>
          <label className={SettingsStyle.advanceMenuLabel}>Height %</label>
          <InputText className={SettingsStyle.advanceMenuInput} disabled name='height' value={inputs?.height ?? '0'} onChange={handleInputChange} />
        </div>
      </div>
    </SettingsContainer>
  )
}
