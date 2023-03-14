import { Calendar } from 'primereact/calendar'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import ViewLabel from '../../ViewLabel/ViewLabel'
import ViewSubtitle from '../../ViewSubtitle/ViewSubtitle'

export default function CreateTimeInput({metadata, value, onChange, openDialog, errors}) {  
    const { name, className, label, subtitle, guid, id, page } = metadata
  
    return (
      <div style={{display: 'flex', justifyContent: 'center', rowGap: '0.5rem'}}>
        <div style={{marginRight: '0.5rem'}}>
            <ViewLabel label={label} />
            <ViewSubtitle subtitle={subtitle} />
        </div>     
          <Calendar timeOnly showTime hourFormat='12' name={name} className={className} value={value} onChange={onChange} />
          <Errors errors={errors} />
      </div>
    )
  }