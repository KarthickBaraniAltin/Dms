import React from 'react'
import {useDraggable} from '@dnd-kit/core'
import {CSS} from '@dnd-kit/utilities'


export function Draggable(props) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
    // data: {
    //     color: props.color
    // }
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    // background: props.color,
    // color: 'white',
    background: 'white',
    padding: '0.5rem',
    marginBottom: '1rem',
    border: '1px solid black'
  }
  
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
}