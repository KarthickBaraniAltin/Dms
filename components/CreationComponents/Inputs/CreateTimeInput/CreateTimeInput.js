import { Calendar } from 'primereact/calendar'
import React from 'react'
import SettingsButton from '../../SettingsButton/SettingsButton'
import Errors from '../../../SharedComponents/Errors/Errors'
import CreateLabel from '../../CreateLabel/CreateLabel'
import CreateSubtitle from '../../CreateSubtitle/CreateSubtitle'

export default function CreateTimeInput({metadata, value, onChange, openDialog, errors}) {  
  const { name, className, label, subtitle, guid, id, page } = metadata

  return (
    <div className='field grid grid-nogutter'>
      <SettingsButton openDialog={openDialog} componentData={metadata} />
      <div className='col-4'>
        <CreateLabel componentData={metadata} label={label} openDialog={openDialog} />       
        <CreateSubtitle value={subtitle} />
      </div>
      <Calendar className='col-8' timeOnly showTime hourFormat='12' name={name} value={value} onChange={onChange} />
      <Errors errors={errors} />
    </div>
  )
}