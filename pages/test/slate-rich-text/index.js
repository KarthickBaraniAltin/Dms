import React, { useState, useCallback } from 'react'
import { createEditor, Editor, Transforms } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
]

// Define our app...
function App() {
    const [editor] = useState(() => withReact(createEditor()))

    const renderElement = useCallback(props => {
      switch (props.element.type) {
        case 'code':
          return <CodeElement {...props} />
        default:
          return <DefaultElement {...props} />
      }
    }, [])
  
    return (
      <Slate editor={editor} value={initialValue}>
        <Editable
          renderElement={renderElement}
          onKeyDown={event => {
            if (event.key === '`' && event.ctrlKey) {
              // Prevent the "`" from being inserted by default.
              event.preventDefault()
              // Otherwise, set the currently selected blocks type to "code".
              Transforms.setNodes(
                editor,
                { type: 'code' },
                { match: n => Editor.isBlock(editor, n) }
              )
            }
          }}
        />
      </Slate>
    )
}
  
const CodeElement = props => {
    return (
        <pre {...props.attributes}>
        <code>{props.children}</code>
        </pre>
    )
}

const DefaultElement = props => {
    return <p {...props.attributes}>{props.children}</p>
}

export default App

//   const [editor] = useState(() => withReact(createEditor()))
//   const initialValue = [
//       {
//           type: 'paragraph',
//           children: [{ text: 'A line of text in a paragraph.' }],
//         },
//   ]

//   const CodeElement = props => {
//       return (
//         <pre {...props.attributes}>
//           <code>{props.children}</code>
//         </pre>
//       )
//   }

//   const DefaultElement = props => {
//       return <p {...props.attributes}>{props.children}</p>
//   }

//   const renderElement = useCallback(props => {
//       switch (props.element.type) {
//         case 'code':
//           return <CodeElement {...props} />
//         default:
//           return <DefaultElement {...props} />
//       }
//   }, [])

//   return (
//       <Slate editor={editor} value={initialValue}>
//           <Editable 
//               renderElement={renderElement}
//               onKeyDown={event => {
//                   if (event.key === '`' && event.ctrlKey) {
//                       event.preventDefault()
//                       console.log('event:', event)
//                       Transforms.setNodes(
//                         editor,
//                         { type: 'code' },
//                         { match: n => Editor.isBlock(editor, n) }
//                       )
//                   }
//               }}
//           />
//       </Slate>
//   )