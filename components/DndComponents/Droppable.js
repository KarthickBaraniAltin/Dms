import React from 'react'
import {useDroppable} from '@dnd-kit/core'

export function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  })
  const style = {
    border: '2px solid black',
    backgroundColor: isOver ? '#004990' : 'white',
    color: isOver ? 'white' : undefined,
    padding: '3rem 6rem',
    margin: 'auto 0',
    textAlign: 'center',
    width: '800px'
  }

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}