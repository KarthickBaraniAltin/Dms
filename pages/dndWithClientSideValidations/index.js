import Head from 'next/head'
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
import { useShowPreview } from '../../hooks/useShowPreview'
import { useHeaderImage } from '../../hooks/useHeaderImage'

export default function DndWithClientSideValidations() {
    const { headerImage, handleHeaderImage } = useHeaderImage()
    const { metadata, addMetadata, setMetadata, renderForm, renderTestForm, mainFormIds, setMainFormIds, dragOverCapture } = useFormCreator({ headerImage, handleHeaderImage })
    const { showPreviewDialog, handlePreview } = useShowPreview()
    const { handleDragEnd, handleTestDragEnd, handleDragOver, handleTestDragOver } = useDnd()

    return (
        <>
            <Head>
                <title>DnD With Client Side Validations</title>
                <link rel='icon' sizes='32x32' href='/form-builder-studio/logo.png' />
            </Head>
            <AuthenticatedTemplate>
                <DndContext
                    onDragEnd={(event) => handleDragEnd(event, metadata, addMetadata, setMetadata, setMainFormIds, dragOverCapture)}
                    onDragOver={(event) => handleDragOver(event, dragOverCapture)}
                    // onDragEnd={(event) => handleTestDragEnd(event, metadata, addMetadata, setMetadata, dragOverCapture)}
                    // onDragOver={(event) => handleTestDragOver(event, dragOverCapture)}
                >
                {showPreviewDialog ? <PreviewDialog showDialog={showPreviewDialog} handlePreview={handlePreview} metadata={metadata} setMetadata={setMetadata} headerImage={headerImage} handleHeaderImage={handleHeaderImage} /> : null}
                <div className='grid'>
                    <ComponentPanel />
                    <Card className='card form-horizontal mt-5 flex justify-content-center' style={{'width': '50%'}}>
                        <Droppable id={'droppable-container-form'}>
                            <SortableContext
                                items={mainFormIds}
                                strategy={verticalListSortingStrategy}
                            >
                                {metadata.length === 0 ? <h5>Drop field here</h5> : renderForm()}
                            </SortableContext>
                        </Droppable>
                        <div className='flex flex-column justify-content-center'>
                            <Button label='Preview' className='flex align-self-center mt-2' onClick={handlePreview} />
                        </div>
                    </Card>
                </div>
                </DndContext>
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