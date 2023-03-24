import { InputTextarea } from 'primereact/inputtextarea'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'

import textareaStyles from '../../../../styles/Inputs/Textarea.module.css'
import clsx from 'clsx'

export default function ViewTextarea({ metadata, value, onChange, errors }) {
    const { name, label, subtitle, defaultValue } = metadata

    return (
        <div className='field grid grid-nogutter mt-3 mb-5'> 
            <div className='col-1-70'>
                <Label label={label} />
                <Subtitle subtitle={subtitle} />
            </div>
            <InputTextarea className={clsx('col-10-3', textareaStyles.textareaInput)} name={name} value={value ?? defaultValue} autoResize onChange={onChange} />
            <Errors errors={errors} />
        </div>
    )
}