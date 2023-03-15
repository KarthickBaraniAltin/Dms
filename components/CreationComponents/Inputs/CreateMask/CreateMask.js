import { InputMask } from 'primereact/inputmask'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import CreateLabel from '../../CreateLabel/CreateLabel'
import CreateSubtitle from '../../CreateSubtitle/CreateSubtitle'
import SettingsButton from '../../SettingsButton/SettingsButton'

export default function CreateMask({ metadata, value, onChange, openDialog, errors}) {
    const { name, className, label, subtitle, mask, guid, id, page } = metadata

    return (
        <div className='field grid grid-nogutter'>
            <SettingsButton openDialog={openDialog} componentData={metadata} />
            <div className='col-4'>
                <CreateLabel componentData={metadata} label={label} openDialog={openDialog} />
                <CreateSubtitle value={subtitle} />
            </div>
            <InputMask name={name} className='col-8' value={value} onChange={onChange} mask={mask} />
            <Errors errors={errors} />
        </div>
    )
}
