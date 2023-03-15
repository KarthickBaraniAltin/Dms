import React from 'react'
import ReadonlyLexicalEditor from '../../../LexicalEditor/ReadonlyLexicalEditor/ReadonlyLexicalEditor'
import CreateLabel from '../../CreateLabel/CreateLabel'
import SettingsButton from '../../SettingsButton/SettingsButton'

export default function CreateReadonlySubtitle({ metadata, openDialog }) {
    const { subtitle } = metadata

    return (
        <div>
            <SettingsButton componentData={metadata} openDialog={openDialog} />
            <CreateLabel componentData={metadata} label='' openDialog={openDialog}/>
            <ReadonlyLexicalEditor value={subtitle} />
        </div>
    )
}
