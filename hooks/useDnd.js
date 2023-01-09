import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { useDroppable } from '@dnd-kit/core'
import { useSortable, arrayMove } from "@dnd-kit/sortable"
import { CSS } from '@dnd-kit/utilities'
import { Guid } from 'js-guid'

const useDnd = () => {

    const Draggable = (props) => {
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
                display: props?.display,
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

    const Droppable = (props) => {
        const {isOver, setNodeRef} = useDroppable({
            id: props.id,
          })
          const style = {
            border: '2px solid black',
            backgroundColor: isOver ? '#004990' : 'white',
            color: isOver ? 'white' : undefined,
            padding: '3rem 6rem',
          }
        
          return (
            <div ref={setNodeRef} style={style}>
              {props.children}
            </div>
          );
    }

    const Sortable = ({id, children}) => {
        const {
            attributes,
            listeners,
            setNodeRef,
            transform,
            transition
        } = useSortable({id: id})
    
        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
            border: '2px solid #004990',
            padding: '1rem',
            marginBottom: '0.2rem'
        }
    
        const dragHandleStyle = {
            backgroundColor: '#004990',
            border: '0',
            padding: '0.3rem',
            width: '100%'
        }
    
        return (
            <div ref={setNodeRef} style={style} {...attributes}>
                {children}
                <button style={dragHandleStyle} {...listeners}></button>
            </div>
        )
    }

    const handleDragEnd = (event) => {
        const { active, over } = event

        if (over !== null && !active.data.current.sortable) {
            const updatedData = JSON.parse(JSON.stringify(active.data.current))

            updatedData.name = `${updatedData.name}_${Guid.newGuid()}`

            addMetadata(updatedData)
        }

        if (active.data.current.sortable) {
            if (active.id !== over.id) {
                setMainFormIds(ids => {
                    const activeIndex = ids.indexOf(active.id)
                    const overIndex = ids.indexOf(over.id)

                    return arrayMove(ids, activeIndex, overIndex)
                })

                setMetadata(prevState => {
                    const movingComponentId = active.id - 1
                    const newPositionId = over.id - 1
                    let tempMetadata = prevState.slice(0)

                    const movingComponent = tempMetadata.slice(movingComponentId, movingComponentId + 1 ? movingComponentId + 1 : null)
                    tempMetadata.splice(movingComponentId, 1)
                    tempMetadata.splice(newPositionId, 0, ...movingComponent)

                    return tempMetadata
                })
            }
        }
    }

    return { Draggable, Droppable, Sortable, handleDragEnd }
}

export default useDnd