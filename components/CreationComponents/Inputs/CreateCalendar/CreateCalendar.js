import { Calendar } from 'primereact/calendar'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import CreateLabel from '../../CreateLabel/CreateLabel'
import CreateSubtitle from '../../CreateSubtitle/CreateSubtitle'
import SettingsButton from '../../SettingsButton/SettingsButton'

export default function CreateCalendar({metadata, value, onChange, openDialog, errors}) {
  const { name, className, label, subtitle, guid, id, page } = metadata

  return (
    <div className='field grid grid-nogutter'>
      <SettingsButton openDialog={openDialog} componentData={metadata} />
      <div className='col-4'>
        <CreateLabel componentData={metadata} label={label} openDialog={openDialog}/>
        <CreateSubtitle value={subtitle} />
      </div>
      <Calendar name={name} className='col-8' value={value} onChange={onChange} />
      <Errors errors={errors} />
    </div>
  )
}
