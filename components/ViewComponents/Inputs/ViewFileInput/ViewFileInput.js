import { Calendar } from 'primereact/calendar'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'

export default function ViewFileInput({ metadata, value, onChange, errors }) {
  const { name, label, subtitle, multiple } = metadata

  return (
    <div className='field grid grid-nogutter'>
      <div className='col-4'>
        <Label label={label} />
        <Subtitle subtitle={subtitle} />
      </div>
      <input
          name={name} 
          className='col-8'
          type='file' 
          value={value}
          onChange={onChange}
          multiple={multiple}
      />
      <Errors errors={errors} />
    </div>
  )
}
