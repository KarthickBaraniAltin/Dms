import LexicalEditor from '../../LexicalEditor/LexicalEditor'
import React from 'react'
import Errors from '../../SharedComponents/Errors/Errors'
import CreateLabel from '../CreateLabel/CreateLabel'
import CreateSubtitle from '../CreateSubtitle/CreateSubtitle'

export default function CreateRichTextInput({ metadata, openDialog, value, onChange, errors }) {
    const { name, label, subtitle, guid, id, page } = metadata

    return (
        <div>
            <CreateLabel componentData={metadata} label={label} openDialog={openDialog} />
            <LexicalEditor name={name} value={value} onChange={onChange} /> 
            <CreateSubtitle value={subtitle} />
            <Errors errors={errors} />
        </div>
    )
}
