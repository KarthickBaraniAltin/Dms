import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'
import SettingsButton from '../../SettingsButton/SettingsButton'

import styles from '../../../../styles/Inputs/Inputs.module.css'

export default function CreateFileInput({ metadata, openDialog, onChange, errors }) {
    const { name, label, multiple, subtitle, guid, id, page } = metadata

    return (
        <div className='field grid grid-nogutter'>
            <SettingsButton openDialog={openDialog} componentData={metadata} />
            <div className='col-4'>
                <Label label={label} />
                <Subtitle subtitle={subtitle} />
            </div>
            <input name={name} type='file' className={`col-8 ${styles.input}`} disabled multiple={multiple} onChange={onChange} />
            <Errors errors={errors} />
        </div>
    )
}
