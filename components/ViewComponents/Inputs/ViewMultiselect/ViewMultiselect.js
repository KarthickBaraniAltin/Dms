import { MultiSelect } from 'primereact/multiselect'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'

export default function ViewMultiselect({ metadata, value, onChange, errors }) {
    const { name, label, subtitle, className, options } = metadata

    return (
        <div className='field grid grid-nogutter'> 
            <div className='col-4'>
                <Label label={label} />
                <Subtitle subtitle={subtitle} />
            </div>
            <MultiSelect className='col-8' name={name} value={value ?? []} onChange={onChange} options={options} display='chip' />
            <Errors errors={errors} />
        </div>
    )
}