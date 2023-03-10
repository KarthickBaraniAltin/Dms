import React from 'react'
import ReadonlyLexicalEditor from '../../LexicalEditor/ReadonlyLexicalEditor/ReadonlyLexicalEditor'
import CreateLabel from '../CreateLabel/CreateLabel'

export default function CreateReadonlySubtitle({ metadata, openDialog }) {
    const { subtitle } = metadata

    return (
        <div>
            <CreateLabel componentData={metadata} label='' openDialog={openDialog}/>
            <ReadonlyLexicalEditor value={subtitle} />
        </div>
    )
}
