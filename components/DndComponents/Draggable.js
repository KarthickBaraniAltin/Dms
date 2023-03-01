import React from 'react'
import {useDraggable} from '@dnd-kit/core'
import {CSS} from '@dnd-kit/utilities'
 
export function Draggable(props) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
    data: { // This optional property is how the metadata of the component is transferred to the main form panel.
        type: props.type,
        name: props.name,
        label: props.label,
        subtitle: props.subtitle,
        defaultValue: props.defaultValue,
        options: props?.options,
        mask: props?.mask,
        fontStyle: props?.fontStyle,
        format: props?.format,
        display: props?.display,
        minDate: props?.minDate,
        maxDate: props?.maxDate,
        sectionMetadata: props?.sectionMetadata,
        id: props.id
    }
  })
  
  const style = {
    transform: CSS.Translate.toString(transform),
    background: 'white',
    padding: '0.5rem',
    marginBottom: '1rem',
    border: '2px solid black'
  }
  
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
}