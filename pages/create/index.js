import Head from 'next/head'
import { DndContext } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import ComponentPanel from '../../components/DndComponents/ComponentPanel'
import { Droppable } from '../../components/DndComponents/Droppable'
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
import { useInputs } from '../../hooks/useInput'
import ShareDialog from '../../components/Settings/ShareDialog/ShareDialog'
import { useShare } from '../../hooks/useShare'
import { useState } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useCreateItems } from '../../hooks/useCreateItems'
import { Sortable } from '../../components/DndComponents/Sortable'

export default function CreateForm() {
    
    // Rendering the form creastion page
    const { headerImage, handleHeaderImage } = useHeaderImage()
    const [ metadata, setMetadata ] = useState([])
    const [ mainFormIds, setMainFormIds ] = useState([])
    const { renderComponents } = useCreateItems({ metadata, setMetadata, mainFormIds })
    
    const { showPreviewDialog, handlePreview } = useShowPreview()
    const { showShareDialog, handleShare, formSubmitResult, setFormSubmitResult, isShareDisabled } = useShare()
    const { handleDragEnd, handleDragOver } = useDnd()
    const dragOverCapture = useRef()

    const { instance } = useMsal()
    const { loading, callApi } = useApi()
    const { acquireToken } = useMsalAuthentication(InteractionType.Silent, formBuilderApiRequest) 

    // These variables are for DND

    // These variables are for pagination
    const [pageNumber, setPageNumber] = useState(1)
    const [currentPage, setCurrentPage] = useState(pageNumber)

    useEffect(() => {
        // metadata.forEach(element => {
        //     element.page = pageNumber

        //     if (element.defaultValue) {
        //         setInputs(inputs => ({...inputs, [element.name]: element.defaultValue}))
        //     }
        // })

        setMainFormIds(metadata.map((data, index) => (index + 1)))

        metadata.map(component => {
            if (component.type === undefined) {
                return
            }
        })
    }, [metadata])

    // useEffect(() => {
    //     // Why we need the below code
    //     // const inputKeysArray = Object.keys(inputs)

    //     // inputKeysArray.map(input => {
    //     //     let isInputFound = metadata.some(element => element.name === input)

    //     //     if (!isInputFound) {
    //     //         delete inputs[input]
    //     //     }
    //     // })

    //     metadata.forEach(element => {
    //         element.page = pageNumber

    //         if (element.defaultValue) {
    //             setInputs(inputs => ({...inputs, [element.name]: element.defaultValue}))
    //         }
    //     })

    //     setMainFormIds(metadata.map((data, index) => (index + 1)))

    //     const sectionIdArray = []
    //     metadata.map(component => {
    //         if (component.type === undefined) {
    //             return
    //         }
    //         if (component.type === 'section') {
    //             sectionIdArray.push({
    //                 id: component.name,
    //                 componentData: component.sectionMetadata.length > 0 ? component.sectionMetadata.map(sectionComponent => sectionComponent.id) : []
    //             })
    //         }
    //     })

    //     setSectionIds(sectionIdArray)
    // }, [metadata])

    // console.log("MainFormIds = ", mainFormIds)

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
                {showPreviewDialog ? <PreviewDialog showDialog={showPreviewDialog} handlePreview={handlePreview} metadata={metadata} setMetadata={setMetadata} headerImage={headerImage} handleHeaderImage={handleHeaderImage} /> : null}
                {showShareDialog ? <ShareDialog showDialog={showShareDialog} handleShare={handleShare} formSubmitResult={formSubmitResult} /> : null}
                <div className='grid'>
                    <ComponentPanel />
                    <Card className='card form-horizontal mt-5 flex justify-content-center' style={{'width': '50%'}}>
                        <div className='flex justify-content-center' style={{gap: '0.5rem', marginBottom: '1rem'}}>
                            <div>
                                <Button label='Preview' style={{width: '90px'}} onClick={handlePreview} />
                            </div>
                            <div>
                                <Button label='Create' style={{width: '90px'}} loading={loading} onClick={submitForm} />
                            </div>
                            <div>
                                <Button label='Share' style={{width: '90px'}} {...isShareDisabled} onClick={handleShare} />
                            </div>
                        </div>
                        {renderComponents()}
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