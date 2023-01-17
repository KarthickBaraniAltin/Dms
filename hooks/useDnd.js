import { arrayMove } from "@dnd-kit/sortable"
import { Guid } from 'js-guid'

const useDnd = () => {

    const handleDragOver = (event, dragOverCapture) => {
        const { active, over } = event

        if (event.collisions.length === 0) return // Prevents error being thrown when collisions array is empty.
        if (active.data.current.sortable) return // Prevents error being thrown when sorting components on main form panel.

        if (event.collisions) {
            const id = event.collisions[event.collisions.length - 1].id 

            if (typeof id !== 'string') return // Prevents error being thrown when id is not a string.

            if (id.includes('section')) { // Checks if the last element in the collisions array is a section.
                dragOverCapture.current = {
                    id: over.id,
                    componentData: active.data.current
                }
            }
        }
    }

    const handleDragEnd = (event, addMetadata, setMetadata, setMainFormIds, mainFormIds, dragOverCapture) => {
        const { active, over } = event

        if (dragOverCapture.current) {
            setMetadata(prevState => {
                const indexOfSection = mainFormIds.findIndex(element => element == dragOverCapture.current.id)
                const tempMetadata = JSON.parse(JSON.stringify(prevState))
                dragOverCapture.current.componentData.name = `${dragOverCapture.current.componentData.name}_${Guid.newGuid()}`

                tempMetadata[indexOfSection].sectionMetadata.push(dragOverCapture.current.componentData)

                return tempMetadata
            })

            dragOverCapture.current = null

            return
        }

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