import { Dropdown } from 'primereact/dropdown'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'

export default function ViewDropdown({ metadata, value, onChange, errors }) {
    const { name, label, subtitle, className, options, validations } = metadata

    return (
        <div className='field grid grid-nogutter'> 
            <div className='col-4'>
                <Label label={label} validations={validations} />
                <Subtitle subtitle={subtitle} />
            </div>
            <Dropdown name={name} className={className} value={value ?? []} onChange={onChange} options={options} />
            <Errors errors={errors} />
        </div>
    )
}