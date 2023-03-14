import { InputNumber } from 'primereact/inputnumber'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import ViewLabel from '../../ViewLabel/ViewLabel'
import ViewSubtitle from '../../ViewSubtitle/ViewSubtitle'

export default function ViewNumber({ metadata, value, onChange, errors }) {
    const { name, label, subtitle } = metadata

    return (
        <div style={{display: 'flex', justifyContent: 'center', rowGap: '0.5rem'}}> 
            <div style={{marginRight: '0.5rem'}}>
                <ViewLabel label={label} />
                <ViewSubtitle subtitle={subtitle} />
            </div>
            <InputNumber name={name} value={value} onChange={onChange} useGrouping={false} />
            <Errors errors={errors} />
        </div>
    )
}