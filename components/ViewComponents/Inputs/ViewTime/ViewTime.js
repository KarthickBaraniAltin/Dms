import { Calendar } from 'primereact/calendar'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'

export default function ViewTime({metadata, value, onChange, errors, invalidStyle}) {  
    const { name, className, label, subtitle, validations, guid, id, page } = metadata
  
    return (
      <div className='field grid grid-nogutter'> 
        <div className='col-4'>
            <Label label={label} validations={validations} />
            <Subtitle subtitle={subtitle} />
        </div>     
          <Calendar className='col-8' timeOnly showTime hourFormat='12' name={name} value={value} onChange={onChange}
          style={errors?.length > 0 ? invalidStyle : null}
          />
          <Errors errors={errors} />
      </div>
    )
  }