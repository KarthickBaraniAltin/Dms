import Head from 'next/head'
import { useEffect } from 'react'
import { useFormCreator } from '../../../hooks/useFormCreator'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsalAuthentication, useMsal } from "@azure/msal-react"
import { formBuilderApiRequest } from '../../../src/msalConfig'
import { getFormDefinition } from '../../../api/apiCalls'
import { InteractionType } from '@azure/msal-browser'
import { useApi } from '../../../hooks/useApi'
import { useHeaderImage } from '../../../hooks/useHeaderImage'
import { useInputs } from '../../../hooks/useInput'
import { useShowPreview } from '../../../hooks/useShowPreview'
import useDnd from '../../../hooks/useDnd'
import ComponentPanel from '../../../components/DndComponents/ComponentPanel'
import { Droppable } from '../../../components/DndComponents/Droppable'
import PreviewDialog from '../../../components/Settings/PreviewDialog/PreviewDialog'
import { DndContext } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'

export default function View({ id, data, api }) {
    const { headerImage, handleHeaderImage } = useHeaderImage()
    const { handleInputChange, inputs, setInputs } = useInputs()
    const { metadata, addMetadata, setMetadata, renderForm, mainFormIds, setMainFormIds, dragOverCapture } = useFormCreator({ headerImage, handleHeaderImage, handleInputChange, inputs, setInputs })
    const { showPreviewDialog, handlePreview } = useShowPreview()
    const { handleDragEnd, handleDragOver } = useDnd()

    const { acquireToken } = useMsalAuthentication(InteractionType.Silent, formBuilderApiRequest)
    const { loading, callApi } = useApi()
    const { instance } = useMsal()

    useEffect(() => {
        setMetadata(data.metadata?.metadata)
    }, [data.metadata, setMetadata])

    const submitFormData = async (event) => {
        event.preventDefault()
        const { accessToken } = await acquireToken()
        const { name, username, localAccountId } = instance.getActiveAccount()

        const params = {
            method: 'PUT',
            url: `/form-builder-studio/api/form-definition/${id}`,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }, 
            data: {
                name: "Test Name",
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
    }

    return (
        <>
            <Head>
                <title>View Form</title>
                <link rel='icon' sizes='32x32' href='/form-builder-studio/logo.png' />
            </Head>
            <AuthenticatedTemplate>                   
            <DndContext
                    onDragEnd={(event) => handleDragEnd(event, metadata, addMetadata, setMetadata, setMainFormIds, dragOverCapture)}
                    onDragOver={(event) => handleDragOver(event, dragOverCapture)}
                >
                {showPreviewDialog ? <PreviewDialog showDialog={showPreviewDialog} handlePreview={handlePreview} metadata={metadata} setMetadata={setMetadata} headerImage={headerImage} handleHeaderImage={handleHeaderImage} /> : null}
                <div className='grid'>
                    <ComponentPanel />
                    <Card className='card form-horizontal mt-5 flex justify-content-center' style={{'width': '50%'}}>
                        <div className='flex flex-column justify-content-center'>
                            <Button label='Preview' className='flex align-self-center mb-2' onClick={handlePreview} />
                        </div>
                        <Droppable id={'droppable-container-form'}>
                            <div className='grid' style={{width: '480px', rowGap: '0.5rem'}}>
                            <SortableContext
                                items={mainFormIds}
                                strategy={rectSortingStrategy}
                            >
                                {metadata.length === 0 ? <h5 style={{margin: '0 auto'}}>Drop field here</h5> : renderForm()}
                            </SortableContext>
                            </div>
                        </Droppable>
                        <div className='flex flex-column justify-content-center'>
                            <Button label='Update' loading={loading} className='flex align-self-center mt-2' onClick={submitFormData} />
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

export async function getStaticPaths({  }) {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}


export async function getStaticProps(context) {
    const { id } = context.params;

    try {
        const res = await getFormDefinition(id)

        return {
            props: {
                id,
                data: res.data,
                api: process.env.FORM_BUILDER_API
            }
        }
    } catch (err) {
        console.error(err)
        return {
            props: {
                data: []
            }
        }
    }
  }