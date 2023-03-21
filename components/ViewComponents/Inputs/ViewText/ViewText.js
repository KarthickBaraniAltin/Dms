import { InputText } from 'primereact/inputtext'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'

import styles from '../../../../styles/Inputs/Inputs.module.css'

export default function ViewText({ metadata, value, onChange, errors }) {
    const { name, label, subtitle } = metadata

    return (
        <div className='field grid grid-nogutter'> 
            <div className='col-4'>
                <Label label={label} />
                <Subtitle subtitle={subtitle} />
            </div>
            <InputText className={`col-8 ${styles.input}`} name={name} value={value} onChange={onChange} />
            <Errors errors={errors} />
        </div>
    )
}
