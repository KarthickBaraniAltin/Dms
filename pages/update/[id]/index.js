import Head from 'next/head'
import { useEffect, useState, useRef } from 'react'
import { Card } from 'primereact/card'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsalAuthentication, useMsal, useAccount } from "@azure/msal-react"
import { formBuilderApiRequest } from '../../../src/msalConfig'
import { getFormDefinition } from '../../../api/apiCalls'
import { InteractionType } from '@azure/msal-browser'
import { useApi } from '../../../hooks/useApi'
import { useInputs } from '../../../hooks/useInput'
import { useValidation } from '../../../hooks/useValidation'
import useDialogs from '../../../hooks/useDialogs'
import useDnd from '../../../hooks/useDnd'
import ComponentPanel from '../../../components/DndComponents/ComponentPanel'
import PreviewButton from '../../../components/Settings/PreviewButton/PreviewButton'
import { DndContext } from '@dnd-kit/core'
import ShareButton from '../../../components/Settings/ShareButton/ShareButton'
import SaveButton from '../../../components/Settings/SaveButton/SaveButton'
import StatusButton from '../../../components/Settings/StatusButton/StatusButton'
import CreateComponents from '../../../components/CreationComponents/CreateComponents/CreateComponents'
import { Droppable } from '../../../components/DndComponents/Droppable'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import { Toast } from 'primereact/toast'

const api = process.env.NEXT_PUBLIC_FORM_BUILDER_API

export default function Update({ id, data }) {
    
    const toast = useRef(null)
    const [formDefinition, setFormDefinition] = useState(data)
    const [metadata, setMetadata] = useState(data?.metadata?.metadata ?? {}) 
    const [mainFormIds, setMainFormIds] = useState([])
    const [files, setFiles] = useState({})
    const [pageNumber, setPageNumber] = useState(1)
    const [currentPage, setCurrentPage] = useState(pageNumber)

    const { handleInputChange, assignValuesNested, setInputs, deleteField, inputs } = useInputs({ initialValues: {} })
    const { errors } = useValidation({ metadata, inputs })
    const { renderDialog, openDialog } = useDialogs({ metadata, setMetadata, deleteField })
    const { handleDragEnd } = useDnd()

    const { acquireToken } = useMsalAuthentication(InteractionType.Silent, formBuilderApiRequest)
    const { loading, callApiFetch } = useApi()
    const { accounts } = useMsal()
    const account = useAccount(accounts[0] ?? {})
    
    useEffect(() => {
        setMainFormIds(Object.keys(metadata).map(data => data))        
    }, [metadata])

    const addMetadata = (data) => {
        setMetadata((prevObj) => ({...prevObj, [data.guid]: data}))
    }

    const updateForm = async (event) => {
        event.preventDefault()
        const { accessToken } = await acquireToken()
        const formData = new FormData()

        let info = {
            name: formDefinition.name,
            description: formDefinition.description,
            authorFullName: '',
            authorId: '',
            authorEmail: '',
        }

        if (account) {
            const { name, username, localAccountId } = account

            info = {
                ...info,
                authorDisplayName: name,
                authorFullName: name,
                authorId: localAccountId,
                authorEmail: username,
            }
        }
        
        formData.append("info", JSON.stringify(info))
        formData.append("metadata", JSON.stringify(metadata))
        
        Object.keys(files).forEach((fieldName) => {
            formData.append(fieldName, files[fieldName])
        })

        const fetchParams = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            body: formData
        }
        
        const res = await callApiFetch(`${api}/FormDefinition/${id}`, fetchParams)
        if (Object.keys(res).length !== 0) {
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Form Updated', life: 2500 })
            setFormDefinition(res)
            return true
        } 

        toast.current.show( {severity: 'error', summary: 'Error', detail: 'Error while updating the form', life: 2500})
        return false
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
                    <div className='grid'>
                        {renderDialog()}
                        <ComponentPanel />
                        <div style={{'width': '5%'}} />
                        <Card className='mt-5' style={{'width': '60%'}}>
                            <div className='flex justify-content-center' style={{gap: '0.5rem', marginBottom: '1rem'}}>
                                <PreviewButton metadata={metadata} setMetadata={setMetadata} inputs={inputs} handleInputChange={handleInputChange} errors={errors} /> 
                                <SaveButton formDefinition={formDefinition} updateForm={updateForm} setFormDefinition={setFormDefinition} loading={loading} metadata={metadata} /> 
                                <ShareButton formDefinition={formDefinition} /> 
                                <StatusButton api={api} formDefinition={formDefinition} setFormDefinition={setFormDefinition}  /> 
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