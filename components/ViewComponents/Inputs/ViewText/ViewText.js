import { InputText } from 'primereact/inputtext'
import React from 'react'
import ViewLabel from '../../ViewLabel/ViewLabel'
import ViewSubtitle from '../../ViewSubtitle/ViewSubtitle'

export default function ViewText({ metadata, value, onChange }) {
    const { name, label, subtitle } = metadata

    return (
        <div style={{display: 'flex', justifyContent: 'center', rowGap: '0.5rem'}}> 
            <div style={{width: '20%'}}>
                <ViewLabel label={label} />
                <ViewSubtitle subtitle={subtitle} />
            </div>
            <InputText name={name} value={value} onChange={onChange} />
        </div>
    )
}
