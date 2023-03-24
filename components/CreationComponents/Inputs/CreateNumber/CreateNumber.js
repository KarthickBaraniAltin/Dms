import clsx from 'clsx'
import { InputNumber } from 'primereact/inputnumber'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'
import SettingsButton from '../../SettingsButton/SettingsButton'

import styles from '../CreateNumber/CreateNumber.module.css'
import sharedStyles from '../../../../styles/Inputs/Inputs.module.css'

export default function CreateNumber({metadata, value, onChange, openDialog, errors}) {
    const { name, className, label, subtitle, defaultValue, guid, id, page } = metadata

    return (
        <div className='field grid grid-nogutter'>
            <SettingsButton openDialog={openDialog} componentData={metadata} />
            <div className='col-4'>
                <Label label={label} />
                <Subtitle subtitle={subtitle}/>
            </div>
            <InputNumber name={name} className={clsx('col-8', styles['numeric-style'])} inputClassName={sharedStyles.input} value={value ?? defaultValue} onChange={onChange} /> 
            <Errors errors={errors} />
        </div>
    )
}
