import { Calendar } from 'primereact/calendar'
import React from 'react'
import SettingsButton from '../../SettingsButton/SettingsButton'
import Errors from '../../../SharedComponents/Errors/Errors'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'

export default function CreateTime({metadata, value, onChange, openDialog, errors}) {  
  const { name, className, label, subtitle, defautltValue, guid, id, page } = metadata

  return (
    <div className='field grid grid-nogutter'>
      <SettingsButton openDialog={openDialog} componentData={metadata} />
      <div className='col-4'>
        <Label label={label} />       
        <Subtitle subtitle={subtitle} />
      </div>
      <Calendar className='col-8' timeOnly showTime hourFormat='12' name={name} value={value ?? defautltValue} onChange={onChange} />
      <Errors errors={errors} />
    </div>
  )
}