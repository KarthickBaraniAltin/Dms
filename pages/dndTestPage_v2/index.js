import Head from 'next/head'
import { Card } from 'primereact/card'
import { DndContext } from '@dnd-kit/core'
import DndLeftPanel from '../../components/DndComponents/DndLeftPanel'
import { useFormCreator } from '../../hooks/useFormCreator'
import { Droppable } from '../../components/DndComponents/Droppable'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { useDndFormCreator } from '../../hooks/useDndFormCreator'
import { useState, useEffect } from 'react'

// This recording provides an in-depth explanation of how the dnd kit is implemented within this project: https://csnedu-my.sharepoint.com/:v:/g/personal/alex_wood_csn_edu/EQ9dAwtEP1lLuaAygmKNi94BwBnlE58Wll6z-iCn59lFOw?e=9LaHLa

export default function DndTestPage() {
    // const {metadata, addMetadata, renderComponents} = useFormCreator()
    const {metadata, addMetadata, setMetadata, renderComponents} = useDndFormCreator()
    const [mainFormIds, setMainFormIds] = useState([])
    const mainFormComponentsObject = renderComponents()

    function handleDragEnd(event) {
        const { active, over } = event
        
        if (over !== null && !active.data.current.sortable) { // This if allows the user to add a component from the dndLeftpanel to the main form panel.
            addMetadata(active.data.current)
        }

        if (active.data.current.sortable) { // This if only fires when the user is dragging a component within the main form panel.
            if (active.id !== over.id) { // This if only fires when a component within the main form panel is hovering over a new position within the panel.
                setMainFormIds(ids => {
                    const activeIndex = ids.indexOf(active.id) // Grabs the index in the mainFormIds array that represents the spot of the component being dragged by the user.
                    const overIndex = ids.indexOf(over.id) // Grabs the index in the mainFormIds array that represents the spot of the component that the user wants replaced by the dragged component.

                    return arrayMove(ids, activeIndex, overIndex) // This function switches the location of the activeIndex and overIndex within the state of mainFormIds.
                })

                setMetadata(prevState => {
                    const movingComponentId = active.id - 1
                    const newPositionId = over.id - 1
                    let tempMetadata = prevState.slice(0) // I put the state in a new variable because changing prevState directly caused components on the main form panel to disappear.

                    const movingComponent = tempMetadata.slice(movingComponentId, movingComponentId + 1 ? movingComponentId + 1 : null) // Grabs the component being dragged by the user in the main form panel.
                    tempMetadata.splice(movingComponentId, 1) // Deletes the component being dragged by the user from its original position.
                    tempMetadata.splice(newPositionId, 0, ...movingComponent) // Puts the component being dragged by the user into its new position.

                    return tempMetadata
                })
            }
        }
    }

    useEffect(() => {
        setMainFormIds(mainFormComponentsObject.props.children.map(component => component.props.id))
    }, [metadata])

    return (
        <>
            <Head>
                <title>DnD Test Page v2</title>
                <link rel='icon' sizes='32x32' href='/component-library/logo.png' />
            </Head>
            <DndContext onDragEnd={handleDragEnd}> {/* All draggable, droppable, and sortable components need to be within this component. */}
                <div className='flex space-around'>
                    <DndLeftPanel />  {/* Statically generates the available input field components on the left hand side of the screen so the user can drag them onto the main form panel. */}
                    <Card className='card form-horizontal mt-5 flex justify-content-center' style={{'width': '70%'}}>
                        <Droppable id={'droppable-container-form'}> {/* This droppable component is used to 'catch' the draggable components from the left hand side panel. */}
                        <SortableContext
                                items={mainFormIds}
                                strategy={verticalListSortingStrategy}
                            >
                            {/* The items attribute must equal an array that represents the sortable items. */}
                                {metadata.length === 0 ? <h5>Drop field here</h5> : renderComponents()}
                            </SortableContext>
                        </Droppable>
                    </Card>
                </div>
            </DndContext>
        </>
    )
}