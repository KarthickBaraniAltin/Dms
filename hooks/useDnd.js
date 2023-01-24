import { arrayMove } from "@dnd-kit/sortable"
import { Guid } from 'js-guid'

const useDnd = () => {

    const handleDragOver = (event, dragOverCapture) => {
        const { active, over } = event

        if (event.collisions.length === 0) return // Prevents error being thrown when collisions array is empty.
        if (active.data.current.sortable) return // Prevents error being thrown when sorting components on main form panel.

        if (event.collisions.length > 0) {
            event.collisions.map(collision => {
                if (typeof collision.id !== 'string') return // Prevents error being thrown when id is not a string.

                if (collision.id.includes('section')) {
                    dragOverCapture.current = {
                        id: over.id,
                        componentData: active.data.current
                    }
                }
            })
        }
    }

    const handleDragEnd = (event, metadata, addMetadata, setMetadata, setMainFormIds, mainFormIds, dragOverCapture) => {
        const { active, over } = event

        if (dragOverCapture.current) {
            if (typeof dragOverCapture.current.id !== 'number') {
                if (dragOverCapture.current.id.includes('section')) {
                    dragOverCapture.current.id = Number(dragOverCapture.current.id.substring(dragOverCapture.current.id.length - 1))
                    // Grabs number at the end of 'section-' which is required for the code below to find the position of the section component.
                }
            }

            setMetadata(prevState => {
                const indexOfSection = mainFormIds.findIndex(element => element == dragOverCapture.current?.id)

                if (indexOfSection === -1) return prevState // Prevents error being thrown when indexOfSection returns -1.

                const tempMetadata = JSON.parse(JSON.stringify(prevState))

                dragOverCapture.current.componentData.id = `section-${indexOfSection + 1}_${tempMetadata[indexOfSection].sectionMetadata.length + 1}`
                dragOverCapture.current.componentData.name = `${dragOverCapture.current.componentData.name}-${Guid.newGuid()}`

                tempMetadata[indexOfSection].sectionMetadata.push(dragOverCapture.current.componentData)

                return tempMetadata
            })

            dragOverCapture.current = null

            return
        }

        if (typeof active.id === 'string') { // This nested if is for sorting components within a section.
            if (active.id.includes('section')) {
                if (active.id !== over.id) {
                    const sectionNumber = active.id.substring(0, 9)

                    setMetadata(prevState => {
                        let tempMetadata = prevState.slice(0)
                        const sectionIndex = tempMetadata.findIndex(element => element.name === sectionNumber)
                        let tempSectionMetadata = tempMetadata[sectionIndex].sectionMetadata.slice(0)
                        const movingComponentId = tempMetadata[sectionIndex].sectionMetadata.findIndex(element => element.id === active.id)
                        const newPositionId = tempMetadata[sectionIndex].sectionMetadata.findIndex(element => element.id === over.id)
                        const movingComponent = tempMetadata[sectionIndex].sectionMetadata.slice(movingComponentId, movingComponentId + 1 ? movingComponentId + 1 : null)

                        tempSectionMetadata.splice(movingComponentId, 1)
                        tempSectionMetadata.splice(newPositionId, 0, ...movingComponent)
                        
                        tempMetadata[sectionIndex].sectionMetadata = tempSectionMetadata

                        return tempMetadata

                    })
                }
                return
            }
        }

        if (over !== null && !active.data.current.sortable) {
            const updatedData = JSON.parse(JSON.stringify(active.data.current))

            if (updatedData.type === 'section') {
                if (metadata.length === 0) {
                    updatedData.name = `${updatedData.name}-1`
                } else {
                    let numberOfSections = 0
                    metadata.map(element => {
                        if (element.type === 'section') {
                            numberOfSections++
                        }
                    })
                    updatedData.name = `${updatedData.name}-${numberOfSections + 1}`
                }
            } else {
                updatedData.name = `${updatedData.name}_${Guid.newGuid()}`
            }

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