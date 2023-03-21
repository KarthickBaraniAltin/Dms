import { InputMask } from 'primereact/inputmask'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'
import SettingsButton from '../../SettingsButton/SettingsButton'

import sharedStyles from '../../../../styles/Inputs/Inputs.module.css'

export default function CreateMask({ metadata, value, onChange, openDialog, errors}) {
    const { name, className, label, subtitle, mask, guid, id, page } = metadata

    return (
        <div className='field grid grid-nogutter'>
            <SettingsButton openDialog={openDialog} componentData={metadata} />
            <div className='col-4'>
                <Label label={label} />
                <Subtitle subtitle={subtitle} />
            </div>
            <InputMask name={name} className={`col-8 ${sharedStyles.input}`} value={value} onChange={onChange} mask={mask} />
            <Errors errors={errors} />
        </div>
    )
}
