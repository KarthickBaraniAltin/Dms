import React from 'react'
import ReadonlyLexicalEditor from '../../../LexicalEditor/ReadonlyLexicalEditor/ReadonlyLexicalEditor'

export default function ViewReadonlySubtitle({ metadata }) {
  const { subtitle } = metadata 
  return (
    <div className='mt-1'>
        <ReadonlyLexicalEditor value={ subtitle } />
    </div>
  )
}