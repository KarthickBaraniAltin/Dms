import { Calendar } from 'primereact/calendar'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'

export default function ViewCalendar({ metadata, value, onChange, errors, invalidStyle }) {
    const { name, label, subtitle, defaultValue, validations } = metadata
    const convertDataFormat = defaultValue ? new Date(defaultValue) : null

    return (
        <div className='field grid grid-nogutter'> 
            <div className='col-4'>
                <Label label={label} validations={validations} />
                <Subtitle subtitle={subtitle} />
            </div>
            <Calendar className='col-8' name={name} value={value ?? convertDataFormat} onChange={onChange}
            style={errors?.length > 0 ? invalidStyle : null}
            />
            <Errors errors={errors} />
        </div>
    )
}
