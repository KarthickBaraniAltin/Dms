import { MultiSelect } from 'primereact/multiselect'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import CreateLabel from '../../CreateLabel/CreateLabel'
import CreateSubtitle from '../../CreateSubtitle/CreateSubtitle'
import SettingsButton from '../../SettingsButton/SettingsButton'

export default function CreateMultiSelect({metadata, openDialog, value, onChange, errors}) {
  const { name, className, label, subtitle, options } = metadata

  return (
    <div className='field grid grid-nogutter'>
        <SettingsButton openDialog={openDialog} componentData={metadata} />
        <div className='col-4'>
          <CreateLabel componentData={metadata} label={label} openDialog={openDialog} />
          <CreateSubtitle value={subtitle} />
        </div>
        <MultiSelect name={name} className='col-8' value={value} onChange={onChange} options={options} display='chip' />        
        <Errors errors={errors} />
    </div>
  )
}
