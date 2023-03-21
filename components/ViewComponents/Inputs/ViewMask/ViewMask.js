import { InputMask } from 'primereact/inputmask'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'

import sharedStyles from '../../../../styles/Inputs/Inputs.module.css'

export default function ViewMask({ metadata, value, onChange, errors }) {
    const { name, label, subtitle, mask } = metadata

    return (
        <div className='field grid grid-nogutter'> 
            <div className='col-4'>
                <Label label={label} />
                <Subtitle subtitle={subtitle} />
            </div>
            <InputMask className={`col-8 ${sharedStyles.input}`} name={name} value={value} onChange={onChange} mask={mask} />
            <Errors errors={errors} />
        </div>
    )
}