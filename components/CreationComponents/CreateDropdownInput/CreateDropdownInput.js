import { Dropdown } from 'primereact/dropdown'
import React from 'react'
import Errors from '../../SharedComponents/Errors/Errors'
import CreateLabel from '../CreateLabel/CreateLabel'
import CreateSubtitle from '../CreateSubtitle/CreateSubtitle'

export default function CreateDropdownInput({ metadata, openDialog, value, onChange, errors }) {
    const { name, className, label, subtitle, options, guid, id, page } = metadata

    return (
        <div>
            <CreateLabel componentData={metadata} label={label} openDialog={openDialog} />
            <Dropdown name={name} className={className} value={value} onChange={onChange} options={options} />
            <CreateSubtitle value={subtitle} />
            <Errors errors={errors} />
        </div>
    )
}
