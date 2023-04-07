import { InputMask } from 'primereact/inputmask'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'
import sharedStyles from '../../../../styles/Inputs/Inputs.module.css'

export default function ViewMask({ metadata, value, onChange, errors, invalidStyle }) {
    const { name, label, subtitle, defaultValue, mask, validations } = metadata

    return (
        <div className='field grid grid-nogutter'> 
            <div style={{textAlign: 'right', marginRight: '1rem'}}>
                <Label label={label} validations={validations} />
                <Subtitle subtitle={subtitle} />
            </div>
            <div>
                <InputMask className={`col-8 ${sharedStyles.input}`} name={name} value={value ?? defaultValue}
                    onChange={onChange} mask={mask} style={errors?.length > 0 ? invalidStyle : null}
                />
                <Errors errors={errors} />
            </div>
        </div>
    )
}