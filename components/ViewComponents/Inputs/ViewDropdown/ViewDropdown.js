import { Dropdown } from 'primereact/dropdown'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import ViewLabel from '../../ViewLabel/ViewLabel'
import ViewSubtitle from '../../ViewSubtitle/ViewSubtitle'

export default function ViewTextarea({ metadata, value, onChange, errors }) {
    const { name, label, subtitle, className, options } = metadata

    return (
        <div style={{display: 'flex', justifyContent: 'center', rowGap: '0.5rem'}}> 
            <div style={{marginRight: '0.5rem'}}>
                <ViewLabel label={label} />
                <ViewSubtitle subtitle={subtitle} />
            </div>
            <Dropdown name={name} className={className} value={value} onChange={onChange} options={options} />
            <Errors errors={errors} />
        </div>
    )
}