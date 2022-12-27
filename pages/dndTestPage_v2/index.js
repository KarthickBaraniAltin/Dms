import Head from 'next/head'
import { Card } from 'primereact/card'
import { DndContext } from '@dnd-kit/core'
import DndLeftPanel from '../../components/DndComponents/DndLeftPanel'
import { useFormCreator } from '../../hooks/useFormCreator'
import { Droppable } from '../../components/DndComponents/Droppable'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { useDndFormCreator } from '../../hooks/useDndFormCreator'
import { useState, useEffect } from 'react'

export default function DndTestPage() {
    // const {metadata, addMetadata, renderComponents} = useFormCreator()
    const {metadata, addMetadata, setMetadata, renderComponents} = useDndFormCreator()
    const [mainFormIds, setMainFormIds] = useState([])
    const mainFormComponentsObject = renderComponents()

    function handleDragEnd(event) {
        const { active, over } = event
        
        if (over !== null && !active.data.current.sortable) {
            addMetadata(active.data.current)
        }

        if (active.data.current.sortable) {
            if (active.id !== over.id) {
                setMainFormIds(ids => {
                    const activeIndex = ids.indexOf(active.id)
                    const overIndex = ids.indexOf(over.id)
                    const newIds = arrayMove(ids, activeIndex, overIndex)

                    return arrayMove(ids, activeIndex, overIndex)
                })

                setMetadata(prevState => {
                    const movingComponentId = active.id - 1
                    const newPositionId = over.id - 1
                    let tempMetadata = prevState.slice(0)
                    // const firstPartial = tempMetadata.slice(movingComponent, movingComponent + 1)
                    // const secondPartial = tempMetadata.slice(newPosition, newPosition + 1 ? newPosition + 1 : null)

                    // tempMetadata.splice(movingComponent, 1, ...secondPartial)
                    // tempMetadata.splice(newPosition, 1, ...firstPartial)

                    const movingComponent = tempMetadata.slice(movingComponentId, movingComponentId + 1 ? movingComponentId + 1 : null)
                    tempMetadata.splice(movingComponentId, 1)
                    tempMetadata.splice(newPositionId, 0, ...movingComponent)

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
            <DndContext onDragEnd={handleDragEnd}>
                <div className='flex space-around'>
                    <DndLeftPanel />
                    <Card className='card form-horizontal mt-5 flex justify-content-center' style={{'width': '70%'}}>
                        <Droppable id={'droppable-container-form'}>
                        <SortableContext
                                items={mainFormIds}
                                strategy={verticalListSortingStrategy}
                            >
                                {metadata.length === 0 ? <h5>Drop field here</h5> : renderComponents()}
                            </SortableContext>
                        </Droppable>
                    </Card>
                </div>
            </DndContext>
        </>
    )
}