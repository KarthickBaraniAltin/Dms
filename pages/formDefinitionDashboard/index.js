import { AuthenticatedTemplate, useMsalAuthentication } from '@azure/msal-react'
import { InteractionType } from '@azure/msal-browser'
import { Toast } from 'primereact/toast'
import Head from 'next/head'
import React, { useRef, useState, useEffect } from 'react'
import { formBuilderApiRequest } from '../../src/msalConfig'
import { Button } from 'primereact/button' // temporary
import { useApi } from '../../hooks/useApi'

export default function formDefinitionDashboard() {
    const { acquireToken } = useMsalAuthentication(InteractionType.Silent, formBuilderApiRequest)
    const { loading, callApi} = useApi()

    const [lazyParams, setLazyParams] = useState({
        page: '',
        rows: 10,
        sortField: '',
        sortOrder: null,
        Global: ''
    })
    
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
        console.log('res:', res)
    }

    return (
        <>
            <Head>
                    <title>Form Definition Dashboard</title>
                    <link rel='icon' sizes='32x32' href='/form-builder-studio/logo.png' />
            </Head>
            <AuthenticatedTemplate>
                {/* <Toast /> */}
                <Button className='mt-5' label='Click for API Call' onClick={handleClickForApiCall} />
            </AuthenticatedTemplate>
        </>
    )
}