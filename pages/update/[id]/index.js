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
import { useInputs } from '../../../hooks/useInput'
import { useValidation } from '../../../hooks/useValidation'
import useDialogs from '../../../hooks/useDialogs'
import useDnd from '../../../hooks/useDnd'
import ComponentPanel from '../../../components/DndComponents/ComponentPanel'
import PreviewDialog from '../../../components/Settings/PreviewDialog/PreviewDialog'
import { DndContext } from '@dnd-kit/core'
import { useShare } from '../../../hooks/useShare'
import ShareDialog from '../../../components/Settings/ShareDialog/ShareDialog'
import { useSave } from '../../../hooks/useSave'
import SaveDialog from '../../../components/Settings/SaveDialog/SaveDialog'
import CreateComponents from '../../../components/CreationComponents/CreateComponents/CreateComponents'
import { Droppable } from '../../../components/DndComponents/Droppable'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'

export default function Update({ api, id, data }) {

    const { headerImage, handleHeaderImage } = useHeaderImage()
    const { handleInputChange, inputs } = useInputs({ initialValues: {} })
    const [ metadata, setMetadata ] = useState(data.metadata.metadata) 
    const { errors } = useValidation({ metadata, inputs })

    const [ mainFormIds, setMainFormIds ] = useState([])
    const { renderDialog, openDialog } = useDialogs({ metadata, setMetadata })

    const { showPreviewDialog, handlePreview } = useShowPreview()
    const { showShareDialog, handleShare, formSubmitResult, setFormSubmitResult } = useShare()
    const { showSaveDialog, handleSave, name, setName, desc, setDesc } = useSave(data)

    const { handleDragEnd } = useDnd()

    const { acquireToken } = useMsalAuthentication(InteractionType.Silent, formBuilderApiRequest)
    const { loading, callApiFetch } = useApi()
    const { instance } = useMsal()

     // These variables are for pagination
     const [pageNumber, setPageNumber] = useState(1)
     const [currentPage, setCurrentPage] = useState(pageNumber)

    useEffect(() => {
        setMainFormIds(Object.keys(metadata).map(data => data))        
    }, [metadata])

    const addMetadata = (data) => {
        setMetadata((prevObj) => ({...prevObj, [data.guid]: data}))
    }

    const updateForm = async (event, formName, description) => {
        event.preventDefault()
        const { accessToken } = await acquireToken()
        const { name, username, localAccountId } = instance.getActiveAccount()

        const formData = new FormData()
        formData.append("info", JSON.stringify({
            name: formName,
            description: description,
            authorFullName: name,
            authorId: localAccountId,
            authorEmail: username,
        }))
        formData.append("metadata", JSON.stringify(metadata))

        const fetchParams = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            body: formData
        }

        const res = await callApiFetch(`${api}/FormDefinition/${id}`, fetchParams)
        if (res?.status == 200) {
            setFormSubmitResult(res)
        }
    }

    return (
        <>
            <Head>
                <title>Update Form</title>
                <link rel='icon' sizes='32x32' href='/form-builder-studio/logo.png' />
            </Head>
            <AuthenticatedTemplate>                   
            <DndContext
                    onDragEnd={(event) => handleDragEnd(event, addMetadata, setMetadata, setMainFormIds)}
                >
                {showPreviewDialog ? <PreviewDialog showDialog={showPreviewDialog} handlePreview={handlePreview} metadata={metadata} setMetadata={setMetadata}
                inputs={inputs} handleInputChange={handleInputChange} errors={errors} headerImage={headerImage} handleHeaderImage={handleHeaderImage} /> : null}
                {showSaveDialog ? <SaveDialog showDialog={showSaveDialog} handleSave={handleSave} updateForm={updateForm} loading={loading} name={name} setName={setName} desc={desc} setDesc={setDesc} /> : null}
                {showShareDialog ? <ShareDialog showDialog={showShareDialog} handleShare={handleShare} id={formSubmitResult ? formSubmitResult.data.id : data.id} formSubmitResult={formSubmitResult ? formSubmitResult.data : data} /> : null}
                <div className='grid'>
                    {renderDialog()}
                    <ComponentPanel />
                    <div style={{'width': '5%'}} />
                    <Card className='mt-5' style={{'width': '60%'}}>
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


export async function getServerSideProps(context) {
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