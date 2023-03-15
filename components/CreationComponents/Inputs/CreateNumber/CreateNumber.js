import clsx from 'clsx'
import { InputNumber } from 'primereact/inputnumber'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import CreateLabel from '../../CreateLabel/CreateLabel'
import CreateSubtitle from '../../CreateSubtitle/CreateSubtitle'
import SettingsButton from '../../SettingsButton/SettingsButton'

import styles from '../CreateNumber/CreateNumber.module.css'

export default function CreateNumber({metadata, value, onChange, openDialog, errors}) {
    const { name, className, label, subtitle, guid, id, page } = metadata

    return (
        <div className='field grid grid-nogutter'>
            <SettingsButton openDialog={openDialog} componentData={metadata} />
            <div className='col-4'>
                <CreateLabel componentData={metadata} label={label} openDialog={openDialog} />
                <CreateSubtitle value={subtitle}/>
            </div>
            <InputNumber name={name} className={clsx('col-8', styles['numeric-style'])} value={value} onChange={onChange} /> 
            <Errors errors={errors} />
        </div>
    )
}
