import { Calendar } from 'primereact/calendar'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'
import SettingsButton from '../../SettingsButton/SettingsButton'
import Label from '../../../SharedComponents/Label/Label'

import sharedStyles from '../../../../styles/Inputs/Inputs.module.css'

export default function CreateCalendar({metadata, value, onChange, openDialog, errors}) {
  const { name, divClassName, label, subtitle, defaultValue, guid, id, page } = metadata
  const convertDataFormat = defaultValue ? new Date(defaultValue) : null
  
  return (
    <div className='field grid grid-nogutter'>
      <SettingsButton openDialog={openDialog} componentData={metadata} />
      <div className='col-4'>
        <Label label={label} />
        <Subtitle subtitle={subtitle} />
      </div>
      <Calendar name={name} className='col-8' inputClassName={sharedStyles.input} value={value ?? convertDataFormat} onChange={onChange} />
      <Errors errors={errors} />
    </div>
  )
}
