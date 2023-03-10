import React from 'react'
import Errors from '../../SharedComponents/Errors/Errors'
import CreateLabel from '../CreateLabel/CreateLabel'
import CreateSubtitle from '../CreateSubtitle/CreateSubtitle'

export default function CreateFileInput({ metadata, openDialog, onChange, errors }) {
    const { name, className, label, multiple, subtitle, guid, id, page } = metadata

    return (
        <div>
            <CreateLabel componentData={metadata} label={label} openDialog={openDialog} />
            <input name={name} type='file' className={className} multiple={multiple} onChange={onChange} />
            <CreateSubtitle value={subtitle} />
            <Errors errors={errors} />
        </div>
    )
}
