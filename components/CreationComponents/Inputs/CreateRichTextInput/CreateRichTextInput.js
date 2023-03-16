import LexicalEditor from '../../../LexicalEditor/LexicalEditor'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import SettingsButton from '../../SettingsButton/SettingsButton'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'

export default function CreateRichTextInput({ metadata, openDialog, value, onChange, errors }) {
    const { name, label, subtitle, guid, id, page } = metadata

    return (
        <div className='field grid grid-nogutter'>
            <SettingsButton openDialog={openDialog} componentData={metadata} />
            <div className='col-2'>
                <Label label={label} />
                <Subtitle subtitle={subtitle} />
            </div>
            <div className='col-10'>
                <LexicalEditor name={name} value={value} onChange={onChange} /> 
            </div>
            <Errors errors={errors} />
        </div>
    )
}
