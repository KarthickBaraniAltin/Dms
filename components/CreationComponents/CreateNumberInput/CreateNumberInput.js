import { InputNumber } from 'primereact/inputnumber'
import React from 'react'
import Errors from '../../SharedComponents/Errors/Errors'
import CreateLabel from '../CreateLabel/CreateLabel'
import CreateSubtitle from '../CreateSubtitle/CreateSubtitle'

export default function CreateNumberInput({metadata, value, onChange, openDialog, errors}) {
    const { name, className, label, subtitle, guid, id, page } = metadata

    return (
        <div>
            <CreateLabel componentData={metadata} label={label} openDialog={openDialog} />
            <InputNumber name={name} className={className} value={value} onChange={onChange} />
            <CreateSubtitle value={subtitle}/>
            <Errors errors={errors} />
        </div>
    )
}
