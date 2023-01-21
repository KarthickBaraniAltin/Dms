import Head from 'next/head'
import { useEffect } from 'react'
import { DndContext } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import ComponentPanel from '../../components/DndComponents/ComponentPanel'
import { Droppable } from '../../components/DndComponents/Droppable'
import { useFormCreator } from '../../hooks/useFormCreator'
import useDnd from '../../hooks/useDnd'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react"
import PreviewDialog from '../../components/Settings/PreviewDialog/PreviewDialog'
import { useShowForm } from '../../hooks/useShowForm'
import { usePreviewDialog } from '../../hooks/usePreviewDialog'

export default function DndWithClientSideValidations() {
    const { metadata, addMetadata, setMetadata, renderComponents, renderPreview, mainFormIds, setMainFormIds, sectionIds, setSectionIds, dragOverCapture } = useFormCreator()
    const { newForm, renderNewFormCard, formTitle } = useShowForm()
    const { showPreviewDialog, handlePreview } = usePreviewDialog()
    const { handleDragEnd, handleDragOver } = useDnd()

    return (
        <>
            <Head>
                <title>DnD With Client Side Validations</title>
                <link rel='icon' sizes='32x32' href='/component-library/logo.png' />
            </Head>
            <AuthenticatedTemplate>
                {newForm ? 
                    <DndContext
                        onDragEnd={(event) => handleDragEnd(event, metadata, addMetadata, setMetadata, setMainFormIds, mainFormIds, sectionIds, setSectionIds, dragOverCapture)}
                        onDragOver={(event) => handleDragOver(event, dragOverCapture)}
                    >
                    {showPreviewDialog ? <PreviewDialog showDialog={showPreviewDialog} handlePreview={handlePreview} metadata={renderPreview()} /> : null}
                    <div className='grid'>
                        <ComponentPanel />
                        <Card className='card form-horizontal mt-5 flex justify-content-center' style={{'width': '50%'}}>
                            <div className='flex flex-column justify-content-center'>
                                <Card style={{'background': '#004990', 'color': 'white', 'marginBottom': '0.5rem'}}>
                                    <h1 style={{'textAlign': 'center'}}>{formTitle}</h1>
                                </Card>
                                <Button label='Preview' className='flex align-self-center mb-2' onClick={handlePreview} />
                            </div>
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
                    :
                    renderNewFormCard()
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