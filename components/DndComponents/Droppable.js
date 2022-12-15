import React from 'react'
import {useDroppable} from '@dnd-kit/core'

export function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  })
  const style = {
    color: isOver ? 'green' : undefined,
    border: '1px solid black',
    padding: '0.5rem',
    marginBottom: '1rem'
  }

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}