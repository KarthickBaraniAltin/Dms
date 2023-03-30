import { InputNumber } from 'primereact/inputnumber'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'

export default function ViewNumber({ metadata, value, onChange, errors, invalidStyle }) {
    const { name, label, subtitle, defaultValue, validations } = metadata

    return (
        <div className='field grid grid-nogutter'> 
            <div className='col-4'>
                <Label label={label} validations={validations} />
                <Subtitle subtitle={subtitle} />
            </div>
            <InputNumber className='col-8' name={name} value={value ?? defaultValue} onChange={onChange} useGrouping={false} 
            style={errors?.length > 0 ? invalidStyle : null}
            />
            <Errors errors={errors} />
        </div>
    )
}