import { AuthenticatedTemplate, useMsalAuthentication } from '@azure/msal-react'
import { InteractionType } from '@azure/msal-browser'
import { Toast } from 'primereact/toast'
import Head from 'next/head'
import React, { useRef, useState, useEffect, lazy } from 'react'
import { formBuilderApiRequest } from '../../src/msalConfig'
import { Button } from 'primereact/button'
import { useApi } from '../../hooks/useApi'
import { Card } from 'primereact/card'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog'

export default function formDefinitionDashboard() {
    const { acquireToken } = useMsalAuthentication(InteractionType.Silent, formBuilderApiRequest)
    const { loading, callApi} = useApi()

    const [formDefinitions, setFormDefinitions] = useState(null)
    const [isVisible, setIsVisible] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null)
    const [totalRecords, setTotalRecords] = useState(0)
    const [lazyParams, setLazyParams] = useState({
        first: 0,
        page: 0,
        rows: 10,
        sortField: null,
        sortOrder: null,
        filters: {
            'global': {value: 'a', matchMode: 'contains'}
        }
    })

    const lazyParamsToQueryString = (lazyParams) => {
        let queryString

        Object.keys(lazyParams).map(key => {
            if (key === 'filters') {
                queryString = lazyParams[key]['global'].value
            }
        })

        return queryString
    }

    let loadLazyTimeout = null 
    useEffect(() => {
        const loadLazyData = async() => {
            if (loadLazyTimeout) {
                clearTimeout(loadLazyTimeout)
            }

            const { accessToken } = await acquireToken()

            const queryString = lazyParamsToQueryString(lazyParams)

            const params = {
                method: 'POST',
                url: `/form-builder-studio/api/formDefinition`,
                headers: {
                    Accept: '*/*',
                    Authorization: `Bearer ${accessToken}`
                },
                data: {
                    query: queryString
                }
            }

            const res = await callApi(params)
            console.log('res:', res)
            setFormDefinitions(res.data.formDefinitions)
            setTotalRecords(res.data.count)
        }

        loadLazyData()
    }, [lazyParams, loadLazyTimeout, acquireToken])
    
    const handleClickForApiCall = async() => {
        const { accessToken } = await acquireToken()
        const params = {
            method: 'POST',
            url: `/form-builder-studio/api/formDefinition`,
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${accessToken}`
            },
            data: {
                rows: lazyParams.rows
            }
        }
        const res = await callApi(params)
        setFormDefinitions(res.data.formDefinitions)
        setTotalRecords(res.data.count)
    }

    const handleClickForModal = (rowData) => {
        setSelectedRow(rowData)
        setIsVisible(true)
    }

    const renderMetadata = (metadata) => {
        let displayData = []

        if (typeof metadata === 'object') {
            Object.keys(metadata).map(element => {
                if (Array.isArray(metadata[element])) {
                    displayData.push(metadata[element].map((arrayElement, index) => {
                        return (
                            <>
                            <h4>{`Component ${index + 1}:`}</h4>
                            {Object.keys(arrayElement).map(componentElement => <p>{`${componentElement}: ${arrayElement[componentElement]}`}</p>)}
                            </>
                        )
                    }))
                } else if (element === 'metadata') {
                    displayData.push(<h4>Metadata:</h4>)
                    displayData.push(Object.keys(metadata.metadata).map(objectElement => <p>{`- ${objectElement}: ${metadata.metadata[objectElement]}`}</p>))
                } else {
                    displayData.push(<h4>{`${element}: ${metadata[element]}`}</h4>)
                }
            })
        }

        return (
            <>
            {displayData}
            </>
        )
    }

    const headerStyle = {fontWeight: '600', fontSize: '15.5px', color: '#000'} 

    const renderHeader = () => {
        return (
          <>
            <div className='table-header'>
              Employees
              <span className="p-input-icon-left" >
                  <i className="pi pi-search" />
                  <InputText value={lazyParams.filters.global.value ?? ''} onChange={onGlobalFilterChange} placeholder="Search" />
              </span>
            </div>
          </> 
        )
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <span>
            <span className='material-icons' style={{cursor: 'pointer', color: '#034692', fontSize: '18px', paddingRight: '3px'}} onClick={() => handleClickForModal(rowData)}>edit_square</span>
            </span>
        )
    }

    const onPage = (event) => {
        setLazyParams(event)
    }

    return (
        <>
            <Head>
                <title>Form Definition Dashboard</title>
                <link rel='icon' sizes='32x32' href='/form-builder-studio/logo.png' />
            </Head>
            <AuthenticatedTemplate>
                {/* <Toast /> */}
                <Dialog header='Metadata of Form Definition' style={{width: '50%'}} visible={isVisible} onHide={() => setIsVisible(false)}>
                    {selectedRow ? 
                        renderMetadata(selectedRow.metadata)
                    :
                        null
                    }
                </Dialog>
                <Card className='card mt-5 form-horizontal' style={{width: '80%'}}>
                    {/* <Button style={{marginBottom: '1rem'}} label='Click for API Call' onClick={handleClickForApiCall} /> */}
                    <DataTable 
                        value={formDefinitions} loading={loading} responsiveLayout='scroll' paginator first={lazyParams.first} rows={lazyParams.rows}
                        totalRecords={totalRecords} onPage={onPage}  /*header={renderHeader}*/
                    >
                        <Column field='action' headerStyle={{...headerStyle, width: '6%'}} header='Action' body={actionBodyTemplate} />
                        <Column className='dashboardTitle' field='name' header='Form Name' headerStyle={{...headerStyle, width: '20%'}} />
                        <Column className='dashboardTitle' field='description' header='Description' headerStyle={{...headerStyle, width: '20%'}} />
                        <Column className='dashboardTitle' field='authorFullName' header='Author Full Name' headerStyle={{...headerStyle, width: '20%'}} />
                        <Column className='dashboardTitle' field='authorId' header='Author Id' headerStyle={{...headerStyle, width: '20%'}} />
                        <Column className='dashboardTitle' field='dateCreated' header='Date Created' headerStyle={{...headerStyle, width: '20%'}} />
                    </DataTable>
                </Card>
            </AuthenticatedTemplate>
        </>
    )
}