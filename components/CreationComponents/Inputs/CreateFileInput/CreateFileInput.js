import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import CreateLabel from '../../CreateLabel/CreateLabel'
import CreateSubtitle from '../../CreateSubtitle/CreateSubtitle'
import SettingsButton from '../../SettingsButton/SettingsButton'

export default function CreateFileInput({ metadata, openDialog, onChange, errors }) {
    const { name, label, multiple, subtitle, guid, id, page } = metadata

    return (
        <div className='field grid grid-nogutter'>
            <SettingsButton openDialog={openDialog} componentData={metadata} />
            <div className='col-4'>
                <CreateLabel componentData={metadata} label={label} openDialog={openDialog}/>
                <CreateSubtitle value={subtitle} />
            </div>
            <input name={name} type='file' title=' ' className='col-8' disabled multiple={multiple} onChange={onChange} />
            <Errors errors={errors} />
        </div>
    )
}
