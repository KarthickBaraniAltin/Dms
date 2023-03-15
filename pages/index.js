import Head from 'next/head'
import Link from 'next/link'
import { AuthenticatedTemplate, useMsalAuthentication } from '@azure/msal-react'
import { InteractionType } from '@azure/msal-browser'
import React, { useState, useEffect } from 'react'
import { formBuilderApiRequest } from '../src/msalConfig'
import { useApi } from '../hooks/useApi'
import { Card } from 'primereact/card'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from "primereact/inputtext"
import { Dialog } from 'primereact/dialog'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'

export default function Home() {
  const { acquireToken } = useMsalAuthentication(InteractionType.Silent, formBuilderApiRequest)
  const { loading, callApi} = useApi()
  const headerStyle = {fontWeight: '600', fontSize: '15.5px', color: '#000'} 
  const [formDefinitions, setFormDefinitions] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedValue, setSelectedValue] = useState({})
  const [totalRecords, setTotalRecords] = useState(0)
  const [lazyParams, setLazyParams] = useState({
      first: 0,
      page: 0,
      rows: 10,
      sortField: null,
      sortOrder: null,
      filters: {
          'global': {value: '', matchMode: 'contains'}
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


  const renderHeader = () => {
      return (
        <>
          <div className='table-header'>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <span className='pi pi-plus'style={{alignSelf: 'center', cursor: 'pointer'}} onClick={() => setIsVisible(true)}/>
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
              <Link href='/view/[id]' as={`/view/${rowData.id}`} rel='noopener noreferrer' style={{marginRight: '0.2rem'}}>
                  <span className='pi pi-eye' style={{cursor: 'pointer', color: '#034692'}} />
              </Link>
              <Link href='/formDefinitionUpdate/[id]' as={`/formDefinitionUpdate/${rowData.id}`} rel='noopener noreferrer'>
                  <span className='material-icons' style={{cursor: 'pointer', color: '#034692', fontSize: '18px', paddingRight: '3px'}}>edit_square</span>
              </Link>
          </span>
      )
  }

  const createForm = () => {
      alert('Functionality still in progress')
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
              <Dialog header='Create New Form' style={{width: '50%'}} visible={isVisible} onHide={() => setIsVisible(false)}>
                  {isVisible ? 
                      <div className='flex flex-column'>
                          <div style={{marginBottom: '0.5rem'}}>
                              <div className='flex flex-column mb-2'>
                                  <label>Form Definition Name</label>
                                  <InputText value={name} onChange={e => setName(e.target.value)} />
                              </div>
                              <div className='flex flex-column'>
                                  <label>Form Definition Description</label>
                                  <InputTextarea value={description} onChange={e => setDescription(e.target.value)} />
                              </div>
                          </div>
                          <Button label='Create' style={{width: '100px'}} loading={loading} onClick={createForm} />
                      </div>
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
