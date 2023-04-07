import { Calendar } from 'primereact/calendar'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'

export default function ViewTime({metadata, value, onChange, errors, invalidStyle}) {  
    const { name, className, label, subtitle, defaultValue, validations, guid, id, page } = metadata
    const convertDataFormat = defaultValue ? new Date(defaultValue) : null

    return (
      <div className='field grid grid-nogutter'> 
        <div style={{textAlign: 'right', marginRight: '1rem'}}>
            <Label label={label} validations={validations} />
            <Subtitle subtitle={subtitle} />
        </div>   
          <div>
            <Calendar className='col-8' timeOnly showTime hourFormat='12' name={name} value={value ?? convertDataFormat} onChange={onChange}
            style={errors?.length > 0 ? invalidStyle : null}
            />
            <Errors errors={errors} />
          </div>
      </div>
    )
  }