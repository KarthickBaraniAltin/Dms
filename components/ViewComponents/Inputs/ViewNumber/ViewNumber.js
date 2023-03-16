import { InputNumber } from 'primereact/inputnumber'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'

export default function ViewNumber({ metadata, value, onChange, errors }) {
    const { name, label, subtitle } = metadata

    return (
        <div className='field grid grid-nogutter'> 
            <div className='col-4'>
                <Label label={label} />
                <Subtitle subtitle={subtitle} />
            </div>
            <InputNumber className='col-8' name={name} value={value} onChange={onChange} useGrouping={false} />
            <Errors errors={errors} />
        </div>
    )
}