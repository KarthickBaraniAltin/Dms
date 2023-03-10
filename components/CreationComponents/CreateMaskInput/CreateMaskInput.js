import { InputMask } from 'primereact/inputmask'
import React from 'react'
import Errors from '../../SharedComponents/Errors/Errors'
import CreateLabel from '../CreateLabel/CreateLabel'
import CreateSubtitle from '../CreateSubtitle/CreateSubtitle'

export default function CreateMaskInput({ metadata, value, onChange, openDialog, errors}) {
    const { name, className, label, subtitle, mask, guid, id, page } = metadata

    return (
        <div>
            <CreateLabel componentData={metadata} label={label} openDialog={openDialog} />
            <InputMask name={name} className={className} value={value} onChange={onChange} mask={mask} />
            <CreateSubtitle value={subtitle} />
            <Errors errors={errors} />
        </div>
    )
}
