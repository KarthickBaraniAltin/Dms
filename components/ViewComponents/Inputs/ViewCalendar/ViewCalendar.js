import { Calendar } from 'primereact/calendar'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'

export default function ViewCalendar({ metadata, value, onChange, errors }) {
    const { name, label, subtitle, defaultValue } = metadata

    return (
        <div className='field grid grid-nogutter'> 
            <div className='col-4'>
                <Label label={label} />
                <Subtitle subtitle={subtitle} />
            </div>
            <Calendar className='col-8' name={name} value={value ?? defaultValue} onChange={onChange} />
            <Errors errors={errors} />
        </div>
    )
}
