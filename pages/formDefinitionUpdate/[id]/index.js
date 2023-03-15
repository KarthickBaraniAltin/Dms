import Head from 'next/head'
import { useEffect, useState, useRef } from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsalAuthentication, useMsal } from "@azure/msal-react"
import { formBuilderApiRequest } from '../../../src/msalConfig'
import { getFormDefinition } from '../../../api/apiCalls'
import { InteractionType } from '@azure/msal-browser'
import { useApi } from '../../../hooks/useApi'
import { useHeaderImage } from '../../../hooks/useHeaderImage'
import { useShowPreview } from '../../../hooks/useShowPreview'
import useDnd from '../../../hooks/useDnd'
import ComponentPanel from '../../../components/DndComponents/ComponentPanel'
import PreviewDialog from '../../../components/Settings/PreviewDialog/PreviewDialog'
import { DndContext } from '@dnd-kit/core'
import { useShare } from '../../../hooks/useShare'
import ShareDialog from '../../../components/Settings/ShareDialog/ShareDialog'
import { useSave } from '../../../hooks/useSave'
import SaveDialog from '../../../components/Settings/SaveDialog/SaveDialog'

export default function Update({ id, data, api }) {
    console.log('data:', data)
    const { headerImage, handleHeaderImage } = useHeaderImage()
    const [ metadata, setMetadata ] = useState(data.metadata.metadata)
    const [ mainFormIds, setMainFormIds ] = useState([])

    const { handleDragEnd, handleDragOver } = useDnd()
    const dragOverCapture = useRef()

    const { showPreviewDialog, handlePreview } = useShowPreview()
    const { showShareDialog, handleShare, formSubmitResult, setFormSubmitResult } = useShare()
    const { showSaveDialog, handleSave } = useSave()

    const { acquireToken } = useMsalAuthentication(InteractionType.Silent, formBuilderApiRequest)
    const { loading, callApi } = useApi()
    const { instance } = useMsal()

    useEffect(() => {
        setMainFormIds(metadata.map((data, index) => (index + 1)))

        metadata.map(component => {
            if (component.type === undefined) {
                return
            }
        })
    }, [metadata])

    const addMetadata = (data) => {
        setMetadata((prevList) => [...prevList, data])
    }

    const submitFormData = async (event, formName, description) => {
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
                name: formName,
                description: description,
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

    console.log('formSubmitResult:', formSubmitResult)

    return (
        <>
            <Head>
                <title>Update Form</title>
                <link rel='icon' sizes='32x32' href='/form-builder-studio/logo.png' />
            </Head>
            <AuthenticatedTemplate>                   
            <DndContext
                    onDragEnd={(event) => handleDragEnd(event, metadata, addMetadata, setMetadata, setMainFormIds, dragOverCapture)}
                    onDragOver={(event) => handleDragOver(event, dragOverCapture)}
                >
                {showPreviewDialog ? <PreviewDialog showDialog={showPreviewDialog} handlePreview={handlePreview} metadata={metadata} setMetadata={setMetadata} headerImage={headerImage} handleHeaderImage={handleHeaderImage} /> : null}
                {showSaveDialog ? <SaveDialog showDialog={showSaveDialog} handleSave={handleSave} submitFormData={submitFormData} loading={loading} prevFormData={data} /> : null}
                {showShareDialog ? <ShareDialog showDialog={showShareDialog} handleShare={handleShare} id={formSubmitResult ? formSubmitResult.data.id : data.id} formSubmitResult={formSubmitResult ? formSubmitResult.data : data} /> : null}
                <div className='grid'>
                    <ComponentPanel />
                    <Card className='card form-horizontal mt-5 flex justify-content-center' style={{'width': '50%'}}>
                        <div className='flex justify-content-center' style={{gap: '0.5rem', marginBottom: '1rem'}}>
                            <div>
                                <Button label='Preview' style={{width: '90px'}} onClick={handlePreview} />
                            </div>
                            <div>
                                <Button label='Save' style={{width: '90px'}} onClick={handleSave} />
                            </div>
                            <div>
                                <Button label='Share' style={{width: '90px'}} onClick={handleShare} />
                            </div>
                        </div>
                        {renderComponents()}
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