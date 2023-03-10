import React from 'react'
import ReadonlyLexicalEditor from '../../LexicalEditor/ReadonlyLexicalEditor/ReadonlyLexicalEditor'

export default function CreateSubtitle({value}) {
  return (
    <div className='mt-1'>
        <ReadonlyLexicalEditor value={value} />
    </div>
  )
}
