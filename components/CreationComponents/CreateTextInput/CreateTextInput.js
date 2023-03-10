import { InputText } from 'primereact/inputtext'
import React from 'react'
import Errors from '../../SharedComponents/Errors/Errors'
import CreateLabel from '../CreateLabel/CreateLabel'
import CreateSubtitle from '../CreateSubtitle/CreateSubtitle'

export default function CreateTextInput({metadata, value, onChange, openDialog, errors}) {  
  const { name, className, label, subtitle, guid, id, page } = metadata

  console.log("Class Name = ", className)

  return (
    <div>
        <CreateLabel componentData={metadata} label={label} openDialog={openDialog} />       
        <InputText name={name} className={className} value={value} onChange={onChange} />
        <CreateSubtitle value={subtitle} />
        <Errors errors={errors} />
    </div>
  )
}
