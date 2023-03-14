import LexicalEditor from '../../../LexicalEditor/LexicalEditor'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import ViewLabel from '../../ViewLabel/ViewLabel'
import ViewSubtitle from '../../ViewSubtitle/ViewSubtitle'

export default function ViewRichText({ metadata, openDialog, value, onChange, errors }) {
    const { name, label, subtitle, guid, id, page } = metadata

    return (
        <div>
            <ViewLabel componentData={metadata} label={label} openDialog={openDialog} />
            <LexicalEditor name={name} value={value} onChange={onChange} /> 
            <ViewSubtitle value={subtitle} />
            <Errors errors={errors} />
        </div>
    )
}