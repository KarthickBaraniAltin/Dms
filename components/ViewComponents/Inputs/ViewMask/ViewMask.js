import { InputMask } from 'primereact/inputmask'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import ViewLabel from '../../ViewLabel/ViewLabel'
import ViewSubtitle from '../../ViewSubtitle/ViewSubtitle'

export default function ViewMask({ metadata, value, onChange, errors }) {
    const { name, label, subtitle, mask } = metadata

    return (
        <div style={{display: 'flex', justifyContent: 'center', rowGap: '0.5rem'}}> 
            <div style={{marginRight: '0.5rem'}}>
                <ViewLabel label={label} />
                <ViewSubtitle subtitle={subtitle} />
            </div>
            <InputMask name={name} value={value} onChange={onChange} mask={mask} />
            <Errors errors={errors} />
        </div>
    )
}