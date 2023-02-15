import Head from 'next/head'
import { AuthenticatedTemplate, useMsalAuthentication } from '@azure/msal-react'
import { InteractionType } from '@azure/msal-browser'
import React, { useState, useEffect } from 'react'
import { formBuilderApiRequest } from '../../src/msalConfig'
import { useApi } from '../../hooks/useApi'
import { Card } from 'primereact/card'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dialog } from 'primereact/dialog'
import { createElement } from 'react'
import { useInputs } from '../../hooks/useInput'
import { Calendar } from "primereact/calendar"
import { Dropdown } from "primereact/dropdown"
import { InputMask } from "primereact/inputmask"
import { InputNumber } from "primereact/inputnumber"
import { InputText } from "primereact/inputtext"
import { InputTextarea } from "primereact/inputtextarea"
import { MultiSelect } from "primereact/multiselect"

export default function FormDefinitionDashboard() {
    const { acquireToken } = useMsalAuthentication(InteractionType.Silent, formBuilderApiRequest)
    const { loading, callApi} = useApi()
    const { handleInputChange, inputs } = useInputs({})

    const [formDefinitions, setFormDefinitions] = useState(null)
    const [isVisible, setIsVisible] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null)
    const [selectedValue, setSelectedValue] = useState({})
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
        let queryString = "?";
        for (const key in lazyParams) {
            if (key !== 'filters') {
                if (lazyParams[key] !== null && lazyParams[key] !== undefined) {
                    if (key === 'first') continue
                    queryString += `${key}=${lazyParams[key]}&`
            }
          } else if (lazyParams.filters.global.value) {
                queryString += `global=${lazyParams.filters.global.value}&`
          }
        }
        return queryString.slice(0, -1)
    }

    const fixDateFormat = (formDefinitions) => {
        return formDefinitions.map(formDefinition => {
            const year = formDefinition.dateCreated.slice(0, 4)
            const month = formDefinition.dateCreated.slice(5, 7)
            const day = formDefinition.dateCreated.slice(8, 10)

            formDefinition.dateCreated = `${month}/${day}/${year}`

            return formDefinition
        })
    }

    const fixDateFormat = (formDefinitions) => {
        return formDefinitions.map(formDefinition => {
            const year = formDefinition.dateCreated.slice(0, 4)
            const month = formDefinition.dateCreated.slice(5, 7)
            const day = formDefinition.dateCreated.slice(8, 10)

            formDefinition.dateCreated = `${month}/${day}/${year}`

            return formDefinition
        })
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
            setFormDefinitions(res?.data?.formDefinitions)
            setTotalRecords(res?.data?.count)
        }

        loadLazyData()
    }, [lazyParams, loadLazyTimeout, acquireToken])

    const handleClickForModal = (rowData) => {
        setSelectedRow(rowData)
        setIsVisible(true)
    }

    const renderMetadata = (metadata) => {
        let leftSideList = []
        let inputFieldList = []
        let previewList = []

        const componentMapper = {
            'text': InputText,
            'calendar': Calendar,
            'number': InputNumber,
            'textarea': InputTextarea,
            'mask': InputMask,
            'dropdown': Dropdown,
            'multiselect': MultiSelect
        }

        metadata.metadata.map(component => {
            const { name, label, subtitle, type, ...rest } = component

            leftSideList.push(
                <div style={{display: 'flex', flexDirection: 'column', width: '100px'}}>
                    <div style={{fontWeight: 'bold'}}>{label}</div>
                    <div style={{fontWeight: 'bold'}}>{subtitle}</div>
                </div>
            )

            inputFieldList.push(
                createElement(
                    componentMapper[type],
                    {
                    ...rest, name, value: type === 'file' ? null : inputs[name], onChange: handleInputChange, 
                    type: type === 'file' ? 'file' : null, multiple: type === 'file' ? true : null
                    }
                )
            )
        })

        for (let i = 0; i < metadata.metadata.length; i++) {
            previewList.push(
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem'}}>
                    <div>{leftSideList[i]}</div>
                    <div style={{width: '200px'}}>{inputFieldList[i]}</div>
                </div>
            )
        }

        return (
            <div className='flex flex-column'>
                <div style={{fontWeight: 'bold', marginBottom: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div>{`Id: ${metadata.id}`}</div>
                    <div>{`Created on: ${metadata.createdAtUtc.slice(5, 7)}/${metadata.createdAtUtc.slice(8, 10)}/${metadata.createdAtUtc.slice(0, 4)}`}</div>
                </div>
                {previewList}
            </div>
        )
    }

    const headerStyle = {fontWeight: '600', fontSize: '15.5px', color: '#000'} 

    const renderHeader = () => {
        return (
          <>
            <div className='table-header'>
              <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                Employees
                <span className="p-input-icon-left" style={{marginLeft: '1rem'}}>
                    <i className="pi pi-search" />
                    <InputText value={lazyParams.filters.global.value ?? ''} onChange={onGlobalFilterChange} placeholder="Search" />
                </span>
              </div>
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

    const onSort = (event) => {
        setLazyParams(event)
    }

    const onFilter = (event) => {
        event['first'] = 0
        setLazyParams(event)
    }

    const onSelectionChange = (event) => {
        const { value } = event
        setSelectedValue(value)
    }

    const onGlobalFilterChange = (e) => {
        const value = e.target.value
        let _filters = { ...lazyParams.filters }
        _filters['global'].value = value
    
        setLazyParams({ ...lazyParams })
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
                    <DataTable 
                        value={formDefinitions} lazy responsiveLayout='scroll' columnResizeMode='expand'
                        dataKey='id' paginator first={lazyParams.first} rows={lazyParams.rows}
                        totalRecords={totalRecords} onPage={onPage} onSort={onSort}
                        sortField={lazyParams.sortField} sortOrder={lazyParams.sortOrder}
                        onFilter={onFilter} filters={lazyParams.filters} header={renderHeader}
                        size='small' loading={loading} onSelectionChange={onSelectionChange}
                        selection={selectedValue} globalFilterFields={[]}
                    >
                        <Column field='action' headerStyle={{...headerStyle, width: '6%'}} header='Action' body={actionBodyTemplate} />
                        <Column className='dashboardTitle' field='name' header='Form Name' headerStyle={{...headerStyle, width: '20%'}} sortable />
                        <Column className='dashboardTitle' field='description' header='Description' headerStyle={{...headerStyle, width: '20%'}} sortable />
                        <Column className='dashboardTitle' field='authorFullName' header='Author Full Name' headerStyle={{...headerStyle, width: '20%'}} sortable />
                        <Column className='dashboardTitle' field='authorId' header='Author Id' headerStyle={{...headerStyle, width: '20%'}} sortable />
                        <Column className='dashboardTitle' field='dateCreated' header='Date Created' headerStyle={{...headerStyle, width: '20%'}} sortable />
                    </DataTable>
                </Card>
            </AuthenticatedTemplate>
        </>
    )
}