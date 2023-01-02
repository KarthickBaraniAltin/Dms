import { DndContext } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Head from 'next/head'
import { Card } from 'primereact/card'
import DndLeftPanel from '../../components/DndComponents/DndLeftPanel'
import { Droppable } from '../../components/DndComponents/Droppable'
import { useFormCreator } from '../../hooks/useFormCreator'
import { useState, useEffect } from 'react'
import LeftComponentPanel from '../../components/LeftComponentPanel'
import { SortableComponent } from '../../components/DndComponents/SortableComponent'

export default function DndWithClientSideValidations() {
    const {metadata, addMetadata, setMetadata, renderComponents} = useFormCreator()
    const [mainFormIds, setMainFormIds] = useState([])
    const mainFormComponentsObject = renderComponents()
    const mainFormComponentsArray = mainFormComponentsObject.props.children.map((component, index) => <SortableComponent key={index} id={index + 1} >{component}</SortableComponent>)

    function handleDragEnd(event) {
        const { active, over } = event
        console.log('Active:', active)
        console.log('Over:', over)

        if (over !== null && !active.data.current.sortable) {
            addMetadata(active.data.current)
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

    useEffect(() => {
        setMainFormIds(mainFormComponentsArray.map(component => component.props.id))
    }, [metadata])

    console.log('mainFormComponentsArray:', mainFormComponentsArray)

    return (
        <>
            <Head>
                <title>DnD With Client Side Validations</title>
                <link rel='icon' sizes='32x32' href='/component-library/logo.png' />
            </Head>
            <DndContext onDragEnd={handleDragEnd}>
                <div className='grid'>
                    <DndLeftPanel />
                    {/* <LeftComponentPanel /> */}
                    <Card className='card form-horizontal mt-5 flex justify-content-center' style={{'width': '50%'}}>
                        <Droppable id={'droppable-container-form'}>
                            <SortableContext
                                items={mainFormIds}
                                strategy={verticalListSortingStrategy}
                            >
                                {metadata.length === 0 ? <h5>Drop field here</h5> : mainFormComponentsArray}
                            </SortableContext>
                        </Droppable>
                    </Card>
                </div>
            </DndContext>
        </>
    )
}