import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'
import { DndContext } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import DndLeftPanel from '../../components/DndComponents/DndLeftPanel'
import LeftComponentPanel from '../../components/LeftComponentPanel'
import { Droppable } from '../../components/DndComponents/Droppable'
import { SortableComponent } from '../../components/DndComponents/SortableComponent'
import { useFormCreator } from '../../hooks/useFormCreator'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react"
import PreviewDialog from '../../components/Settings/PreviewDialog/PreviewDialog'
import { Guid } from 'js-guid'

export default function DndWithClientSideValidations() {
    const {metadata, addMetadata, setMetadata, renderComponents} = useFormCreator()
    const [mainFormIds, setMainFormIds] = useState([])
    const [newForm, setNewForm] = useState(false)
    const [newFormValue, setNewFormValue] = useState('')
    const [showForm, setShowForm] = useState(false)
    const newFormTitle = newFormValue
    const mainFormComponentsObject = renderComponents(false)
    const mainFormComponentsArray = mainFormComponentsObject.props.children.map((component, index) => <SortableComponent key={index} id={index + 1} >{component}</SortableComponent>)
    const previewForm = renderComponents(true)
    
    function handleDragEnd(event) {
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

    function handleNewForm() {
        setNewForm(true)
    }

    function handlePreview() {
        setShowForm(prevState => !prevState)
    }

    useEffect(() => {
        setMainFormIds(mainFormComponentsArray.map(component => component.props.id))
    }, [metadata])

    return (
        <>
            <Head>
                <title>DnD With Client Side Validations</title>
                <link rel='icon' sizes='32x32' href='/component-library/logo.png' />
            </Head>
            <AuthenticatedTemplate>
                {newForm ? 
                    <DndContext onDragEnd={handleDragEnd}>
                    {showForm ? <PreviewDialog showForm={showForm} handlePreview={handlePreview} metadata={previewForm} /> : null}
                    <div className='grid'>
                        <DndLeftPanel />
                        {/* <LeftComponentPanel /> */}
                            <Card className='card form-horizontal mt-5 flex justify-content-center' style={{'width': '50%'}}>
                                <div className='flex flex-column justify-content-center'>
                                    <Card style={{'background': '#004990', 'color': 'white', 'margin-bottom': '0.5rem'}}>
                                        <h1 style={{'text-align': 'center'}}>{newFormTitle}</h1>
                                    </Card>
                                    <Button label='Preview' className='flex align-self-center mb-2' onClick={handlePreview} />
                                </div>
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
                    :
                    <Card className='card form-horizontal mt-5 flex justify-content-center' style={{'width': '50%'}}>
                        <h5 style={{'margin-bottom': '0.25rem', 'font-size': '1rem'}}>Create new form</h5>
                        <InputText
                            value={newFormValue}
                            onChange={(e) => setNewFormValue(e.target.value)}
                            className='mr-2'
                        />
                        <Button label='Get started' onClick={handleNewForm} />
                    </Card>
                }
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                    <div className='card form-horizontal mt-3' style={{'width': '55rem'}}>
                        <div className='card-body'>
                            <h2 className='text-center text-primary card-title mb-2'>Please Sign In</h2>
                        </div>
                    </div>
                </UnauthenticatedTemplate>
        </>
    )
}