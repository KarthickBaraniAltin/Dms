import React from 'react'
import ReadonlyLexicalEditor from '../../../LexicalEditor/ReadonlyLexicalEditor/ReadonlyLexicalEditor'

export default function ViewReadonlySubtitle({ metadata }) {
  const { subtitle } = metadata 
  return (
    <div>
        <ReadonlyLexicalEditor value={ subtitle } />
    </div>
  )
}