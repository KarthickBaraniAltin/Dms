import Head from 'next/head'
import { useEffect, useState, useRef } from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsalAuthentication, useMsal, useAccount } from "@azure/msal-react"
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
import { useStatus } from '../../../hooks/useStatus'
import StatusDialog from '../../../components/Settings/StatusDialog/StatusDialog'
import CreateComponents from '../../../components/CreationComponents/CreateComponents/CreateComponents'
import { Droppable } from '../../../components/DndComponents/Droppable'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import { Toast } from 'primereact/toast'

const api = process.env.NEXT_PUBLIC_FORM_BUILDER_API

export default function Update({ id, data }) {
    
    const toast = useRef(null)
    const { headerImage, handleHeaderImage } = useHeaderImage()
    const { handleInputChange, assignValuesNested, setInputs, deleteField, inputs } = useInputs({ initialValues: {} })
    const [ files, setFiles ] = useState({})
    const [ metadata, setMetadata ] = useState(data?.metadata?.metadata ?? {}) 
    const { errors } = useValidation({ metadata, inputs })

    const [ mainFormIds, setMainFormIds ] = useState([])
    const { renderDialog, openDialog } = useDialogs({ metadata, setMetadata, deleteField })

    const { showPreviewDialog, handlePreview } = useShowPreview()
    const { showShareDialog, handleShare, formSubmitResult, setFormSubmitResult } = useShare()
    const { showSaveDialog, handleSave, name, setName, desc, setDesc } = useSave(data)
    const { showStatusDialog, handleStatus } = useStatus()

    const { handleDragEnd } = useDnd()

    const { acquireToken } = useMsalAuthentication(InteractionType.Silent, formBuilderApiRequest)
    const { loading, callApiFetch } = useApi()
    const { instance, accounts } = useMsal()
    const account = useAccount(accounts[0] ?? {})

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

        const formData = new FormData()

        let info = {
            name: formName,
            description: description,
            authorFullName: '',
            authorId: '',
            authorEmail: '',
        }

        if (account) {
            const { name, username, localAccountId } = account

            info = {
                authorFullName: name,
                authorId: localAccountId,
                authorEmail: username,
            }
        }
        
        formData.append("info", JSON.stringify({
            
        }))
        formData.append("metadata", JSON.stringify(metadata))
        
        // Add files to request
        Object.keys(files).forEach((fieldName) => {
            formData.append(fieldName, files[fieldName]);
        })

        const fetchParams = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            body: formData
        }

        const res = await callApiFetch(`${api}/FormDefinition/${id}`, fetchParams)
        if (res) {
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Form Updated', life: 2500 })
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
                <Toast ref={toast} />           
                <DndContext
                        onDragEnd={(event) => handleDragEnd(event, metadata, addMetadata, setMetadata, setMainFormIds)}
                >
                    {showPreviewDialog ? <PreviewDialog showDialog={showPreviewDialog} handlePreview={handlePreview} metadata={metadata} setMetadata={setMetadata}
                    inputs={inputs} handleInputChange={handleInputChange} errors={errors} headerImage={headerImage} handleHeaderImage={handleHeaderImage} /> : null}
                    {showSaveDialog ? <SaveDialog showDialog={showSaveDialog} handleSave={handleSave} updateForm={updateForm} loading={loading} name={name} setName={setName} desc={desc} setDesc={setDesc} metadata={metadata} /> : null}
                    {showShareDialog ? <ShareDialog showDialog={showShareDialog} handleShare={handleShare} id={formSubmitResult ? formSubmitResult.id : data.id} formSubmitResult={formSubmitResult ? formSubmitResult : data} /> : null}
                    {showStatusDialog ? <StatusDialog showDialog={showStatusDialog} handleStatus={handleStatus} updateForm={updateForm} loading={loading} /> : null}
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
                                <div>
                                    <Button label='Status' style={{width: '90px'}} onClick={handleStatus} />
                                </div>
                            </div>
                            <Droppable id='droppable-container-form'>
                                <SortableContext items={mainFormIds} strategy={rectSortingStrategy}>
                                    <CreateComponents 
                                        metadata={metadata} 
                                        setMetadata={setMetadata}
                                        openDialog={openDialog} 
                                        inputs={inputs} 
                                        handleInputChange={handleInputChange} 
                                        assignValuesNested={assignValuesNested}
                                        errors={errors}
                                        files={files}
                                        setFiles={setFiles}
                                        setInputs={setInputs}
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