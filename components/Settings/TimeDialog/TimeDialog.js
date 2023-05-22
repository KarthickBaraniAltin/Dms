import React from 'react'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import LexicalEditor from '../../LexicalEditor/LexicalEditor';
import ColumnSizeDropdowm from '../ColumnSizeDropdown/ColumnSizeDropdowm'
import SettingsContainer from '../SettingsContainer/SettingsContainer'
import SettingsStyle from '../SettingsContainer/SettingsContainer.module.css'

export default function TimeDialog({ visible, hideDialog, assignValuesNested, inputs, handleInputChange, handleUpdate }) {
  return (
    <SettingsContainer inputs={inputs} handleInputChange={handleInputChange} hideMenu={hideDialog} handleUpdate={handleUpdate}>
      <div className={SettingsStyle.accordionContent} style={{ display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
        <div>
          <label className={SettingsStyle.advanceMenuLabel}>Name</label>
          <InputText className={SettingsStyle.advanceMenuInput} name='name' autoComplete='off' value={inputs?.name ?? ''} onChange={handleInputChange} />
        </div>
        <div>
          <label className={SettingsStyle.accordionContentLabel}>Subtitle: </label>
          <LexicalEditor name='subtitle' value={inputs?.subtitle ?? ''} onChange={assignValuesNested} />
        </div>
        <div>
          <label className={SettingsStyle.advanceMenuLabel}>Default Value</label>
          <Calendar className={SettingsStyle.advanceMenuInput} showTime timeOnly hourFormat='12' name='defaultValue' value={inputs?.defaultValue ?? ''} onChange={handleInputChange} />
        </div>
        <div>
          <ColumnSizeDropdowm name='divClassName' inputs={inputs} onChange={handleInputChange} />
        </div>
        <div>
          <label className={SettingsStyle.advanceMenuLabel}>Min Time</label>
          <Calendar className={SettingsStyle.advanceMenuInput} showTime timeOnly hourFormat='12' name='validations.minTime.time' value={inputs?.validations?.minTime?.time ?? undefined} onChange={handleInputChange} />
        </div>
        <div>
          <label className={SettingsStyle.advanceMenuLabel}>Min Time Message</label>
          <InputText className={SettingsStyle.advanceMenuInput} name='validations.minTime.message' value={inputs?.validations?.minTime?.message ?? ''} onChange={handleInputChange} />
        </div>
        <div>
          <label className={SettingsStyle.advanceMenuLabel}>Max Time</label>
          <Calendar className={SettingsStyle.advanceMenuInput} showTime timeOnly hourFormat='12' name='validations.maxTime.time' value={inputs?.validations?.maxTime?.time ?? undefined} onChange={handleInputChange} />
        </div>
        <div>
          <label className={SettingsStyle.advanceMenuLabel}>Max Time Message</label>
          <InputText className={SettingsStyle.advanceMenuInput} name='validations.maxTime.message' value={inputs?.validations?.maxTime?.message ?? ''} onChange={handleInputChange} />
        </div>
      </div>
    </SettingsContainer>
  )
}