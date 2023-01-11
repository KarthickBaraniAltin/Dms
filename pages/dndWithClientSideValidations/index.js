import Head from 'next/head'
import { useState, useEffect } from 'react'
import { DndContext } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import DndLeftPanel from '../../components/DndComponents/DndLeftPanel'
import { Droppable } from '../../components/DndComponents/Droppable'
import { Sortable } from '../../components/DndComponents/Sortable'
import { useFormCreator } from '../../hooks/useFormCreator'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react"
import PreviewDialog from '../../components/Settings/PreviewDialog/PreviewDialog'
import useDnd from '../../hooks/useDnd'

export default function DndWithClientSideValidations() {
    const {metadata, addMetadata, setMetadata, renderComponents} = useFormCreator()
    const [mainFormIds, setMainFormIds] = useState([])
    const { handleDragEnd } = useDnd()
    const [newForm, setNewForm] = useState(false)
    const [newFormValue, setNewFormValue] = useState('')
    const [showForm, setShowForm] = useState(false)
    const newFormTitle = newFormValue
    const previewForm = renderComponents(true)

    const mainFormComponentsObject = renderComponents(false)
    const mainFormComponentsArray = mainFormComponentsObject.props.children.map((component, index) => <Sortable key={index} id={index + 1} >{component}</Sortable>)

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
                    <DndContext onDragEnd={(event) => handleDragEnd(event, addMetadata, setMainFormIds, setMetadata)}>
                    {showForm ? <PreviewDialog showForm={showForm} handlePreview={handlePreview} metadata={previewForm} /> : null}
                    <div className='grid'>
                        <DndLeftPanel />
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
                    // <DndContainer
                    //     showForm={showForm}
                    //     setShowForm={setShowForm}
                    //     newFormTitle={newFormTitle}
                    //     mainFormIds={mainFormIds}
                    //     setMainFormIds={setMainFormIds}
                    //     metadata={metadata}
                    //     addMetadata={addMetadata}
                    //     setMetadata={setMetadata}
                    //     mainFormComponentsArray={mainFormComponentsArray}
                    // />
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