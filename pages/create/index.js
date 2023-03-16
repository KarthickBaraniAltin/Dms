import Head from 'next/head'
import { DndContext } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import ComponentPanel from '../../components/DndComponents/ComponentPanel'
import useDnd from '../../hooks/useDnd'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, useMsalAuthentication } from "@azure/msal-react"
import PreviewDialog from '../../components/Settings/PreviewDialog/PreviewDialog'
import { useShowPreview } from '../../hooks/useShowPreview'
import { useHeaderImage } from '../../hooks/useHeaderImage'
import { useApi } from '../../hooks/useApi'
import { InteractionType } from '@azure/msal-browser'
import { formBuilderApiRequest } from '../../src/msalConfig'
import { useShare } from '../../hooks/useShare'
import { useEffect, useRef, useState } from 'react'
import CreateComponents from '../../components/CreationComponents/CreateComponents/CreateComponents'
import useDialogs from '../../hooks/useDialogs'
import { Droppable } from '../../components/DndComponents/Droppable'
import { useInputs } from '../../hooks/useInput'
import { useValidation } from '../../hooks/useValidation'

export default function CreateForm() {
    
    // Rendering the form creation page
    const { headerImage, handleHeaderImage } = useHeaderImage()
    const { handleInputChange, inputs } = useInputs({ initialValues: {} })
    const [ metadata, setMetadata ] = useState([])
    const { errors } = useValidation({ metadata, inputs })

    const [ mainFormIds, setMainFormIds ] = useState([])
    const { renderDialog, openDialog } = useDialogs({ metadata, setMetadata })

    const { showPreviewDialog, handlePreview } = useShowPreview()
    const { showShareDialog, handleShare, formSubmitResult, setFormSubmitResult, isShareDisabled } = useShare()
    const { handleDragEnd, handleDragOver } = useDnd()
    const dragOverCapture = useRef()

    const { instance } = useMsal()
    const { loading, callApi } = useApi()
    const { acquireToken } = useMsalAuthentication(InteractionType.Silent, formBuilderApiRequest) 

    // These variables are for pagination
    const [pageNumber, setPageNumber] = useState(1)
    const [currentPage, setCurrentPage] = useState(pageNumber)

    useEffect(() => {
        setMainFormIds(metadata.map((data, index) => (index + 1)))

        metadata.map(component => {
            if (component.type === undefined) {
                return
            }
        })
    }, [metadata])

    const changePage = () => {
        setCurrentPage()
    }

    const addPage = () => {
        setPageNumber()
    }

    const addMetadata = (data) => {
        setMetadata((prevList) => [...prevList, data])
    }

    const submitForm = async () => {
        const { accessToken } = await acquireToken()
        const { name, username, localAccountId } = instance.getActiveAccount()

        const params = {
            method: 'POST',
            url: `/form-builder-studio/api/form-definition`,
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${accessToken}`
            },
            data: {
                name: "New Test",
                description: "Desc ",
                authorFullName: name,
                authorId: localAccountId,
                authorEmail: username,
                metadata: {
                    metadata: metadata
                }
            }
        }

        const res = await callApi(params)
        setFormSubmitResult(res)
    }

    return (
        <>
            <Head>
                <title>Create Form</title>
                <link rel='icon' sizes='32x32' href='/form-builder-studio/logo.png' />
            </Head>
            <AuthenticatedTemplate>
                <DndContext
                    onDragEnd={(event) => handleDragEnd(event, metadata, addMetadata, setMetadata, setMainFormIds, dragOverCapture)}
                    onDragOver={(event) => handleDragOver(event, dragOverCapture)}
                >
                {showPreviewDialog ? <PreviewDialog showDialog={showPreviewDialog} handlePreview={handlePreview} metadata={metadata} inputs={inputs} handleInputChange={handleInputChange} errors={errors} setMetadata={setMetadata} headerImage={headerImage} handleHeaderImage={handleHeaderImage} /> : null}
                <div className='flex'>
                    {renderDialog()}
                    <ComponentPanel />
                    <div style={{'width': '5%'}} />
                    <Card className='card ml-5 mt-5 mr-5' style={{'width': '55%'}}>
                        <div className='flex flex-column mb-4'>
                            <Button label='Preview' className='flex align-self-center mb-2' onClick={handlePreview} />
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
                        <div className='flex flex-column justify-content-center'>
                            <Button label='Create' loading={loading} className='flex align-self-center mt-4' onClick={submitForm} />
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