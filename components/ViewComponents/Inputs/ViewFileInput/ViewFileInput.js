import { Calendar } from 'primereact/calendar'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'

export default function ViewFileInput({ metadata, value, onChange, errors, invalidStyle }) {
  const { name, label, subtitle, multiple, validations } = metadata

  return (
    <div className='field grid grid-nogutter'>
      <div style={{textAlign: 'right', marginRight: '1rem'}}>
        <Label label={label} validations={validations} />
        <Subtitle subtitle={subtitle} />
      </div>
      <div>
        <input
            name={name} 
            className='col-8'
            type='file' 
            value={value}
            onChange={onChange}
            multiple={multiple}
            style={errors?.length > 0 ? invalidStyle : null}
        />
        <Errors errors={errors} />
      </div>
    </div>
  )
}
