import Head from 'next/head'
import { DndContext } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, rectSortingStrategy } from '@dnd-kit/sortable'
import ComponentPanel from '../../components/DndComponents/ComponentPanel'
import { Droppable } from '../../components/DndComponents/Droppable'
import { useFormCreator } from '../../hooks/useFormCreator'
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

export default function CreateForm() {
    const { headerImage, handleHeaderImage } = useHeaderImage()
    const { metadata, addMetadata, setMetadata, renderForm, mainFormIds, setMainFormIds, dragOverCapture } = useFormCreator({ headerImage, handleHeaderImage })
    const { showPreviewDialog, handlePreview } = useShowPreview()
    const { handleDragEnd, handleDragOver } = useDnd()

    const { instance } = useMsal()
    const { loading, callApi } = useApi()
    const { acquireToken } = useMsalAuthentication(InteractionType.Silent, formBuilderApiRequest) 

    const submitForm = async () => {
        const { accessToken } = await acquireToken()
        const { name, username, localAccountId } = instance.getAc

        const params = {
            method: 'POST',
            url: `/form-builder-studio/api/form-definition`,
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${accessToken}`
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
                <title>Create Form</title>
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
                            <Button label='Create' loading={loading} className='flex align-self-center mt-2' onClick={submitForm} />
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