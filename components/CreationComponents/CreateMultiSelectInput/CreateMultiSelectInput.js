import { MultiSelect } from 'primereact/multiselect'
import React from 'react'
import Errors from '../../SharedComponents/Errors/Errors'
import CreateLabel from '../CreateLabel/CreateLabel'
import CreateSubtitle from '../CreateSubtitle/CreateSubtitle'

export default function CreateMultiSelectInput({metadata, openDialog, value, onChange, errors}) {
  const { name, className, label, subtitle, options } = metadata

  return (
    <div>
        <CreateLabel componentData={metadata} label={label} openDialog={openDialog} />
        <MultiSelect name={name} className={className} value={value} onChange={onChange} options={options} display='chip' />        
        <CreateSubtitle value={subtitle} />
        <Errors errors={errors} />
    </div>
  )
}
