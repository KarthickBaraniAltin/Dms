import { Calendar } from 'primereact/calendar'
import React from 'react'
import ViewLabel from '../../ViewLabel/ViewLabel'
import ViewSubtitle from '../../ViewSubtitle/ViewSubtitle'

export default function ViewCalendar({ metadata, value, onChange }) {
    const { name, label, subtitle, defaultValue } = metadata

    return (
        <div style={{display: 'flex', justifyContent: 'center', rowGap: '0.5rem'}}> 
            <div style={{marginRight: '0.5rem'}}>
                <ViewLabel label={label} />
                <ViewSubtitle subtitle={subtitle} />
            </div>
            <Calendar name={name} value={value} onChange={onChange} />
        </div>
    )
}
