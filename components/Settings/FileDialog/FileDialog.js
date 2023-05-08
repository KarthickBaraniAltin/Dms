import React from 'react'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { MultiSelect } from 'primereact/multiselect'
import { Checkbox } from 'primereact/checkbox'
import LexicalEditor from '../../LexicalEditor/LexicalEditor'
import ColumnSizeDropdowm from '../ColumnSizeDropdown/ColumnSizeDropdowm'
import SettingsContainer from '../SettingsContainer/SettingsContainer'
import SettingsStyle from '../SettingsContainer/SettingsContainer.module.css'

export default function FileDialog({ visible, hideDialog, inputs, assignValuesNested, handleInputChange, handleUpdate }) {
  
  const fileTypes = [
    {label: '.pdf', value: 'application/pdf'},
    {label: '.png', value: 'image/png'},
    {label: '.jpeg', value: 'image/jpeg' }
  ]

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
        <div>
          <ColumnSizeDropdowm name='divClassName' inputs={inputs} onChange={handleInputChange} />
        </div>
        <div>
          <label className={SettingsStyle.advanceMenuLabel}>Multiple</label>
          <Checkbox name='multiple' checked={inputs?.multiple} className='ml-2' value={inputs?.multiple ?? false} onChange={e => assignValuesNested('multiple', e.checked)} />
        </div>
        <div>
          <label className={SettingsStyle.advanceMenuLabel}>Min File Size</label>
          <InputNumber className={SettingsStyle.advanceMenuInput} name='validations.minFile.fileSize' value={inputs?.validations?.minFile?.fileSize ?? 0} onChange={handleInputChange} format={false}/>
        </div>
        <div>
          <label className={SettingsStyle.advanceMenuLabel}>Min File Message</label>
          <InputText className={SettingsStyle.advanceMenuInput} name='validations.minFile.message' value={inputs?.validations?.minFile?.message ?? ''} onChange={handleInputChange} />
        </div>
        <div>
          <label className={SettingsStyle.advanceMenuLabel}>Max File Size</label>
          <InputNumber className={SettingsStyle.advanceMenuInput} name='validations.maxFile.fileSize' value={inputs?.validations?.maxFile?.fileSize ?? 0} onChange={handleInputChange} format={false}/>
        </div>
        <div>
          <label className={SettingsStyle.advanceMenuLabel}>Max File Message</label>
          <InputText className={SettingsStyle.advanceMenuInput} name='validations.maxFile.message' value={inputs?.validations?.maxFile?.message ?? ''} onChange={handleInputChange} />
        </div>
        <div>
          <label className={SettingsStyle.advanceMenuLabel}>Acceptable File Types</label>
          <MultiSelect className={SettingsStyle.advanceMenuInput} name='validations.fileTypes.fileTypes' value={inputs?.validations?.fileTypes?.fileTypes ?? null} options={fileTypes} onChange={handleInputChange} />
        </div>
        <div>
          <label className={SettingsStyle.advanceMenuLabel}>File Types Message</label>
          <InputText className={SettingsStyle.advanceMenuInput} name='validations.fileTypes.message' value={inputs?.validations?.fileTypes?.message ?? ''} onChange={handleInputChange} />
        </div>
      </div>
    </SettingsContainer>
  )
}
