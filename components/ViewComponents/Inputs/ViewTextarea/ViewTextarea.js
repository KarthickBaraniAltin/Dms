import { InputTextarea } from 'primereact/inputtextarea'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'

import textareaStyles from '../../../../styles/Inputs/Textarea.module.css'
import clsx from 'clsx'

export default function ViewTextarea({ metadata, value, onChange, errors, invalidStyle }) {
    const { name, label, subtitle, defaultValue, validations } = metadata

    return (
        <div className='field grid grid-nogutter mt-3 mb-5'> 
            <div style={{textAlign: 'right', marginRight: '1rem'}}>
                <Label label={label} validations={validations} />
                <Subtitle subtitle={subtitle} />
            </div>
            <div>
                <InputTextarea className={clsx('col-10-3', textareaStyles.textareaInput)} name={name} value={value ?? defaultValue} autoResize onChange={onChange} 
                style={errors?.length > 0 ? invalidStyle : null}
                />
                <Errors errors={errors} />
            </div>
        </div>
    )
}