import { InputTextarea } from 'primereact/inputtextarea'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'

export default function ViewTextarea({ metadata, value, onChange, errors }) {
    const { name, label, subtitle } = metadata

    return (
        <div className='field grid grid-nogutter'> 
            <div className='col-2'>
                <Label label={label} />
                <Subtitle subtitle={subtitle} />
            </div>
            <InputTextarea className='col-10' name={name} value={value} onChange={onChange} />
            <Errors errors={errors} />
        </div>
    )
}