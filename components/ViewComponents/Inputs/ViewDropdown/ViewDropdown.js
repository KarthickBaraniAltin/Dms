import { Dropdown } from 'primereact/dropdown'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'

export default function ViewDropdown({ metadata, value, onChange, errors, invalidStyle }) {
    const { name, label, subtitle, className, options, validations, defaultValue } = metadata

    return (
        <div className='field grid grid-nogutter'> 
            <div style={{textAlign: 'right', marginRight: '1rem'}}>
                <Label label={label} validations={validations} />
                <Subtitle subtitle={subtitle} />
            </div>
            <div>
                <Dropdown name={name} className={className} value={value ?? defaultValue} onChange={onChange}
                    options={options} style={errors?.length > 0 ? invalidStyle : null}
                />
                <Errors errors={errors} />
            </div>
        </div>
    )
}