import { arrayMove } from "@dnd-kit/sortable"
import { Guid } from 'js-guid'

const useDnd = () => {

    const handleDragOver = (event, dragOverCapture) => {
        const { active } = event

        if (event.collisions.length === 0) return // Prevents error being thrown when collisions array is empty.
        if (active.data.current.sortable) return // Prevents error being thrown when sorting components on main form panel.

        if (event.collisions) {
            const id = event.collisions[event.collisions.length - 1].id 
            console.log('id:', id)
            if (id.includes('section')) { // Checks if the last element in the collisions array is a section.
                // setSectionMetadata(prevState => {
                //     const draggedItemMetadata = active.data.current
                //     draggedItemMetadata.id = prevState.length + 1

                //     return [
                //         ...prevState,
                //         {componentData: draggedItemMetadata}
                //     ]
                // })

                dragOverCapture.current = active.data.current
            }
        }
    }

    const handleDragEnd = (event, addMetadata, setMetadata, setMainFormIds, dragOverCapture) => {
        const { active, over } = event
        console.log('dragOverCapture:', dragOverCapture.current)
        dragOverCapture.current = null
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

    return { handleDragEnd, handleDragOver }
}

export default useDnd