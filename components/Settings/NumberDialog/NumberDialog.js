import React from 'react'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import LexicalEditor from '../../LexicalEditor/LexicalEditor';
import ColumnSizeDropdowm from '../ColumnSizeDropdown/ColumnSizeDropdowm'
import SettingsContainer from '../SettingsContainer/SettingsContainer'
import SettingsStyle from '../SettingsContainer/SettingsContainer.module.css'

export default function NumberDialog({ visible, hideDialog, assignValuesNested, inputs, handleInputChange, handleUpdate }) {
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
          <InputNumber className={SettingsStyle.advanceMenuInput} name='defaultValue' value={inputs?.defaultValue ?? ''} onChange={handleInputChange} />
        </div>
        <div>
          <ColumnSizeDropdowm name='divClassName' inputs={inputs} onChange={handleInputChange} />
        </div>
        <div>
          <label className={SettingsStyle.advanceMenuLabel}>Min Number</label>
          <InputNumber className={SettingsStyle.advanceMenuInput} name='validations.minNum.number' value={inputs?.validations?.minNum?.number ?? 0} onValueChange={handleInputChange} format={false} />
        </div>
        <div>
          <label className={SettingsStyle.advanceMenuLabel}>Min Number Message</label>
          <InputText className={SettingsStyle.advanceMenuInput} name='validations.minNum.message' value={inputs?.validations?.minNum?.message ?? ''} onChange={handleInputChange} />
        </div>
        <div>
          <label className={SettingsStyle.advanceMenuLabel}>Max Number</label>
          <InputNumber className={SettingsStyle.advanceMenuInput} name='validations.maxNum.number' value={inputs?.validations?.maxNum?.number ?? 1000} onValueChange={handleInputChange} format={false} />
        </div>
        <div>
          <label className={SettingsStyle.advanceMenuLabel}>Max Number Message</label>
          <InputText className={SettingsStyle.advanceMenuInput} name='validations.maxNum.message' value={inputs?.validations?.maxNum?.message ?? ''} onChange={handleInputChange} />
        </div>
      </div>
    </SettingsContainer>
  )
}
