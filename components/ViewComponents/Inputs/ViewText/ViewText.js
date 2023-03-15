import { InputText } from 'primereact/inputtext'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import ViewLabel from '../../ViewLabel/ViewLabel'
import ViewSubtitle from '../../ViewSubtitle/ViewSubtitle'

export default function ViewText({ metadata, value, onChange, errors }) {
    const { name, label, subtitle } = metadata

    return (
        <div style={{display: 'flex', justifyContent: 'center', rowGap: '0.5rem'}}> 
            <div style={{marginRight: '0.5rem'}}>
                <ViewLabel label={label} />
                <ViewSubtitle subtitle={subtitle} />
            </div>
            <InputText name={name} value={value} onChange={onChange} />
            <Errors errors={errors} />
        </div>
    )
}
