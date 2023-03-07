import Head from 'next/head'
import { DndContext } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy, verticalListSortingStrategy } from '@dnd-kit/sortable'
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
import { useEffect, useRef, useState } from 'react'
import { useInputs } from '../../hooks/useInput'
import useDialogs from '../../hooks/useDialogs'
import { useRenderItems } from '../../hooks/useRenderItems'
import { Sortable } from '../../components/DndComponents/Sortable'

export default function CreateForm() {
    
    // Rendering the form creastion page
    const { headerImage, handleHeaderImage } = useHeaderImage()
    const [ metadata, setMetadata ] = useState([])
    const { inputs, setInputs, handleInputChange } = useInputs({ initialValues: {} })
    const { renderDialog } = useDialogs({ metadata, setMetadata })
    const { renderLabel, renderComponents } = useRenderItems({ metadata, setMetadata, headerImage, handleHeaderImage })
    
    const { showPreviewDialog, handlePreview } = useShowPreview()
    const { handleDragEnd, handleDragOver } = useDnd()
    
    const { instance } = useMsal()
    const { loading, callApi } = useApi()
    const { acquireToken } = useMsalAuthentication(InteractionType.Silent, formBuilderApiRequest) 

    // These variables are for DND
    const [mainFormIds, setMainFormIds] = useState([])
    const [sectionIds, setSectionIds] = useState([])
    const dragOverCapture = useRef()

    // These variables are for pagination
    const [pageNumber, setPageNumber] = useState(1)
    const [currentPage, setCurrentPage] = useState(pageNumber)

    useEffect(() => {
        const inputKeysArray = Object.keys(inputs)

        inputKeysArray.map(input => {
            let isInputFound = metadata.some(element => element.name === input)

            if (!isInputFound) {
                delete inputs[input]
            }
        })

        metadata.forEach(element => {
            element.page = pageNumber

            if (element.defaultValue) {
                setInputs(inputs => ({...inputs, [element.name]: element.defaultValue}))
            }
        })

        setMainFormIds(metadata.map((data, index) => index + 1))

        const sectionIdArray = []
        metadata.map(component => {
            if (component.type === undefined) {
                return
            }
            if (component.type === 'section') {
                sectionIdArray.push({
                    id: component.name,
                    componentData: component.sectionMetadata.length > 0 ? component.sectionMetadata.map(sectionComponent => sectionComponent.id) : []
                })
            }
        })

        setSectionIds(sectionIdArray)
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
                                {metadata.length === 0 ? <h5 style={{margin: '0 auto'}}>Drop field here</h5> : 
                                <>
                                    {metadata.map((data, index) => {
                                        const { type, subtitle, label, subtitleComponent, name, defaultValue, sectionMetadata, ...rest } = data
                                        if (type === 'section') {
                                            let sectionIdsForDroppable = sectionIds.find(element => element?.id === name)
                                            sectionIdsForDroppable = sectionIdsForDroppable?.componentData ? sectionIdsForDroppable.componentData : []
                                            return (
                                                <Sortable key={index} id={index + 1}>
                                                <div className='field col-12'>
                                                    <div style={{'display': 'flex', 'justifyContent': 'flex-end'}}>{type.toUpperCase()}</div>
                                                    {renderDialog()}
                                                    {renderLabel(data, label, type)}
                                                    <div>
                                                        <Droppable id={name}>
                                                            <SortableContext
                                                                items={sectionIdsForDroppable}
                                                                strategy={verticalListSortingStrategy}
                                                            >
                                                                {renderComponents(sectionMetadata, null, true)}
                                                            </SortableContext>
                                                        </Droppable>
                                                    </div>
                                                </div>
                                                </Sortable>
                                            )
                                        }
                    
                                        return renderComponents(data, index)
                                    })}
                                </>}
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