import Head from 'next/head'
import { useEffect, useState, useRef } from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsalAuthentication, useMsal } from "@azure/msal-react"
import { useHeaderImage } from '../../hooks/useHeaderImage'
import { useShowPreview } from '../../hooks/useShowPreview'
import { useInputs } from '../../hooks/useInput'
import { useValidation } from '../../hooks/useValidation'
import useDialogs from '../../hooks/useDialogs'
import useDnd from '../../hooks/useDnd'
import ComponentPanel from '../../components/DndComponents/ComponentPanel'
import PreviewDialog from '../../components/Settings/PreviewDialog/PreviewDialog'
import { DndContext } from '@dnd-kit/core'
import CreateComponents from '../../components/CreationComponents/CreateComponents/CreateComponents'
import { Droppable } from '../../components/DndComponents/Droppable'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'

export default function Create() {

    const { headerImage, handleHeaderImage } = useHeaderImage()
    const { handleInputChange, inputs } = useInputs({ initialValues: {} })
    const [ metadata, setMetadata ] = useState({})
    const { errors } = useValidation({ metadata, inputs })

    const [ mainFormIds, setMainFormIds ] = useState([])
    const { renderDialog, openDialog } = useDialogs({ metadata, setMetadata })

    const { showPreviewDialog, handlePreview } = useShowPreview()

    const { handleDragEnd } = useDnd()

    useEffect(() => {
        setMainFormIds(Object.keys(metadata).map(data => data))
    }, [metadata])

    const addMetadata = (data) => {
        setMetadata((prevObj) => ({...prevObj, [data.guid]: data}))
    }

    return (
        <>
            <Head>
                <title>Create Form</title>
                <link rel='icon' sizes='32x32' href='/form-builder-studio/logo.png' />
            </Head>
            <AuthenticatedTemplate>                   
            <DndContext
                    onDragEnd={(event) => handleDragEnd(event, metadata, addMetadata, setMetadata, setMainFormIds)}
                >
                {showPreviewDialog ? <PreviewDialog showDialog={showPreviewDialog} handlePreview={handlePreview} metadata={metadata} setMetadata={setMetadata}
                inputs={inputs} handleInputChange={handleInputChange} errors={errors} headerImage={headerImage} handleHeaderImage={handleHeaderImage} /> : null}
                <div className='grid'>
                    {renderDialog()}
                    <ComponentPanel />
                    <div style={{'width': '5%'}} />
                    <Card className='card mt-5' style={{'width': '60%'}}>
                        <div className='flex justify-content-center' style={{gap: '0.5rem', marginBottom: '1rem'}}>
                            <div>
                                <Button label='Preview' style={{width: '90px'}} onClick={handlePreview} />
                            </div>
                        </div>
                        <Droppable id='droppable-container-form'>
                            <SortableContext items={mainFormIds} strategy={rectSortingStrategy}>
                                <CreateComponents 
                                    metadata={metadata} 
                                    openDialog={openDialog} 
                                    inputs={inputs} 
                                    handleInputChange={handleInputChange} 
                                    errors={errors}
                                />
                            </SortableContext>
                        </Droppable>
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