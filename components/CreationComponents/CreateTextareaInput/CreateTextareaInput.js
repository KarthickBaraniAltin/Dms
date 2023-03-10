import { InputTextarea } from 'primereact/inputtextarea'
import React from 'react'
import CreateLabel from '../CreateLabel/CreateLabel'
import CreateSubtitle from '../CreateSubtitle/CreateSubtitle'
import Errors from '../../SharedComponents/Errors/Errors'

export default function CreateTextareaInput({metadata, value, onChange, openDialog, errors}) {
  const { name, className, label, subtitle, options, guid, id, page } = metadata

  return (
    <div>
        <CreateLabel componentData={metadata} label={label} openDialog={openDialog} />
        <InputTextarea name={name} className={className} value={value} onChange={onChange} />
        <CreateSubtitle value={subtitle} />
        <Errors errors={errors} />
    </div>
  )
}
