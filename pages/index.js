import Head from 'next/head'
import Link from 'next/link'
import { AuthenticatedTemplate, useAccount, useMsal, useMsalAuthentication } from '@azure/msal-react'
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
import { useRouter } from 'next/router'
import Image from 'next/image'
import Flex from '../components/Layout/Flex'
import Header from '../components/Header/Header'
import avatar from '../images/avatar.webp'
import TextInput from '../components/Input/TextInput'
import { PanelMenu } from 'primereact/panelmenu'
import { Approval } from '../components/WorkflowNode/Approval/Approval'




export default function Home() {
    const { accounts } = useMsal()
    const account = useAccount(accounts[0] ?? {})
    const { acquireToken } = useMsalAuthentication(InteractionType.Silent, formBuilderApiRequest)
    const { loading, callApi } = useApi()
    const { loading: createFormLoading, callApi: callCreateFormApi } = useApi()
    const headerStyle = { fontWeight: '600', fontSize: '15.5px', color: '#000' }
    const [formDefinitions, setFormDefinitions] = useState(null)
    const [isVisible, setIsVisible] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [selectedValue, setSelectedValue] = useState({})
    const [totalRecords, setTotalRecords] = useState(0)
    const router = useRouter()
    const [lazyParams, setLazyParams] = useState({
        first: 0,
        page: 0,
        rows: 10,
        sortField: 'dateCreated',
        sortOrder: -1,
        filters: {
            'global': { value: '', matchMode: 'contains' }
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
        const loadLazyData = async () => {
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
            setFormDefinitions(res?.data?.formDefinitions)
            setTotalRecords(res?.data?.count)
        }

        if (account) {
            loadLazyData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lazyParams, loadLazyTimeout, acquireToken, account])


    const renderHeader = () => {
        return (
            <>
                <div className='table-header'>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <span className='pi pi-plus' style={{ alignSelf: 'center', cursor: 'pointer' }} onClick={() => setIsVisible(true)} />
                        <span className="p-input-icon-left" style={{ marginLeft: '1rem' }}>
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
                <Link href='/view/[id]' as={`/view/${rowData.id}`} rel='noopener noreferrer' style={{ marginRight: '0.2rem' }}>
                    <span className='pi pi-eye' style={{ cursor: 'pointer', color: '#034692' }} />
                </Link>
                <Link href='/update/[id]' as={`/update/${rowData.id}`} rel='noopener noreferrer'>
                    <span className='material-icons' style={{ cursor: 'pointer', color: '#034692', fontSize: '18px', paddingRight: '3px' }}>edit_square</span>
                </Link>
            </span>
        )
    }

    const createForm = async (event) => {
        event.preventDefault()

        const { accessToken } = await acquireToken()
        const params = {
            method: 'POST',
            url: `/form-builder-studio/api/form-definition`,
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${accessToken}`
            },
            data: {
                name: name,
                description: description,
                authorDisplayName: account.name,
                authorLegalName: account.name,
                authorId: account.localAccountId,
                authorEmail: account.username,
                metadata: {
                    metadata: []
                }
            }
        }

        const res = await callCreateFormApi(params)
        if (res) {
            router.push(`/update/${res.data.id}`)
        }
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

    // console.log('test', process.env.NEXT_PUBLIC_FORM_BUILDER_API)

    const modulesItems = [
        {
            label: 'My Dashboard',
            icon: 'pi  pi-th-large',
        },
        {
            label: 'Form builder',
            items: [
                {
                    label: 'My Forms',
                },
                {
                    label: 'Templates',
                }
            ]
        },
        // {
        //     label: 'Workflow Builder',
        //     items: [
        //         {
        //             label: 'My Flows',
        //         },
        //         {
        //             label: 'Templates',
        //         }
        //     ]
        // },
    ]

    const formItems = [
        {
            label: 'Form Data',
        },
        {
            label: 'Drafts',
        },
        {
            label: 'In Progress',
        },
        {
            label: 'Awaiting For Me',
        },
        {
            label: 'Approved',
        },
        {
            label: 'Rejected',
        }
    ]
    const documentItems = [

        {
            label: 'Awaiting For Me',
        },
        {
            label: 'Previously Submitted',
        },
        {
            label: 'Document Repo',
        }
    ]


    return (
        <>
            <Head>
                <title>Form Definition Dashboard</title>
                <link rel='icon' sizes='32x32' href='/form-builder-studio/logo.png' />
            </Head>
            <AuthenticatedTemplate>
                <Dialog header='Create New Form' style={{ width: '50%' }} visible={isVisible} onHide={() => setIsVisible(false)}>
                    <div className='flex flex-column'>
                        <div className='mt-1'>
                            <div className='flex flex-column mt-2'>
                                <label>Form Definition Name</label>
                                <InputText value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className='flex flex-column mt-2'>
                                <label>Form Definition Description</label>
                                <InputTextarea value={description} onChange={e => setDescription(e.target.value)} autoResize />
                            </div>
                            <div className='flex flex-column mt-2'>
                                <label>User Name</label>
                                <InputText value={account?.name} disabled />
                            </div>
                            <div className='flex flex-column mt-2'>
                                <label>User Email</label>
                                <InputText value={account?.username} disabled />
                            </div>
                        </div>
                        <Button className='mt-3' label='Create' style={{ width: '100px' }} loading={createFormLoading} onClick={createForm} />
                    </div>
                </Dialog>
                <Flex className={'h-full gap-2'}>
                    <aside className={`bgPrimaryLight my-5 border-round`}>
                        <Flex direction={'column'} >
                            <Flex className={'justify-content-center'} >
                                <Header size={2}>Peda Docs</Header>
                            </Flex>
                            <Flex className={'align-items-center justify-content-around gap-2'} >
                                <Flex direction={'column'} >
                                    <Header size={4} >Jhon Smith</Header>
                                    <small>Senior developer</small>
                                </Flex>
                                <Flex className={'align-items-center gap-2'}>
                                    <Image src={avatar.src} width={50} height={50} alt={'Avatar'} />
                                    <Flex direction={'column'} >
                                        <Button icon="pi pi-cog" rounded text severity="info" aria-label="User" />
                                        <Button icon="pi pi-share-alt" rounded text severity="info" aria-label="User" />
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex className={'justify-content-center'} >
                                <div>
                                    <TextInput label='Quick Search' />
                                </div>
                            </Flex>
                            <Header size={4} className={'mx-2'} >Modules</Header>
                            <Flex>
                                <PanelMenu model={modulesItems} className="w-full md:w-25rem" />
                            </Flex>
                            <Header size={4} className={'mx-2'} >Forms</Header>
                            <Flex>
                                <PanelMenu model={formItems} className="w-full md:w-25rem" />
                            </Flex>
                            <Header size={4} className={'mx-2'} >Documents</Header>
                            <Flex>
                                <PanelMenu model={documentItems} className="w-full md:w-25rem" />
                            </Flex>
                        </Flex>
                    </aside>
                    <Card className='card my-5 form-horizontal' style={{ width: '100%' }}>
                        {/* <Approval /> */}
                        <DataTable
                            value={formDefinitions} lazy responsiveLayout='scroll' columnResizeMode='expand'
                            dataKey='id' paginator first={lazyParams.first} rows={lazyParams.rows}
                            totalRecords={totalRecords} onPage={onPage} onSort={onSort}
                            sortField={lazyParams.sortField} sortOrder={lazyParams.sortOrder}
                            onFilter={onFilter} filters={lazyParams.filters} header={renderHeader}
                            size='small' loading={loading} onSelectionChange={onSelectionChange}
                            selection={selectedValue} globalFilterFields={[]}
                        >
                            <Column field='action' headerStyle={{ ...headerStyle, width: '6%' }} header='Action' body={actionBodyTemplate} />
                            <Column className='dashboardTitle' field='name' header='Form Name' headerStyle={{ ...headerStyle, width: '20%' }} sortable />
                            <Column className='dashboardTitle' field='description' header='Description' headerStyle={{ ...headerStyle, width: '20%' }} sortable />
                            <Column className='dashboardTitle' field='authorLegalName' header='Author Legal Name' headerStyle={{ ...headerStyle, width: '20%' }} sortable />
                            <Column className='dashboardTitle' field='authorId' header='Author Id' headerStyle={{ ...headerStyle, width: '20%' }} sortable />
                            <Column className='dashboardTitle' field='dateCreated' header='Date Created' headerStyle={{ ...headerStyle, width: '20%' }} sortable />
                            <Column className='dashboardTitle' field='status' header='Status' headerStyle={{ ...headerStyle, width: '20%' }} sortable />
                        </DataTable>
                    </Card>
                </Flex>
            </AuthenticatedTemplate>
        </>
    )
}
