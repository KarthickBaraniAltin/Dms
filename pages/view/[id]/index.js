import Head from 'next/head'
import { useEffect } from 'react'
import { useFormCreator } from '../../../hooks/useFormCreator'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsalAuthentication } from "@azure/msal-react"
import { usePreviewCreator } from '../../../hooks/usePreviewCreator'
import { formBuilderApiRequest } from '../../../src/msalConfig'
import { getFormDefinition } from '../../../api/apiCalls'
import { InteractionType } from '@azure/msal-browser'
import { useApi } from '../../../hooks/useApi'
import axios from 'axios'
import https from 'https'

const formBuilderStudioApi = process.env.FORM_BUILDER_API

export default function View({ id, data }) {

    const { metadata, setMetadata } = useFormCreator()
    const { renderPreview, inputs } = usePreviewCreator({ metadata })
    const { acquireToken } = useMsalAuthentication(InteractionType.Silent, formBuilderApiRequest)
    const { loading, error, response, callApiFetch } = useApi()

    const submitFormData = async (event) => {
        event.preventDefault()
        const { accessToken } = await acquireToken()

        function jsonToFormData(json) {
            var formData = new FormData()
            for (var key in json) {
                if (key.startsWith('file')) {
                    json[key].forEach((file, index) => {
                        formData.append(key + '_' + index, file)
                    })
                } else {
                    formData.append(key, JSON.stringify(json[key]))
                }
            }
            return formData
        }

        const formData = jsonToFormData(inputs)
        const fetchParams = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'multi-part/formdata'
            }, 
            body: jsonToFormData(inputs)
        }

        const res = await callApiFetch(`/form-builder-studio/api/form-data/${id}`, fetchParams)
        console.log("RES = ", res)
    }

    useEffect(() => {
        setMetadata(data.metadata?.metadata)
    }, [data.metadata])

    return (
        <>
            <Head>
                <title>View Form</title>
                <link rel='icon' sizes='32x32' href='/form-builder-studio/logo.png' />
            </Head>
            <AuthenticatedTemplate>                   
                <div className='grid'>
                    <Card className='card form-horizontal mt-5' style={{'width': '50%'}}>
                        <div className='grid p-fluid form-grid'>
                            {renderPreview()}
                            <div className='field md:col-6 col-offset-3'>
                                <Button label="Submit" onClick={submitFormData} loading={loading} />
                            </div>
                        </div>
                    </Card>
                </div>
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

export async function getStaticPaths({  }) {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}


export async function getStaticProps(context) {
    const { id } = context.params;

    try {
        const res = await getFormDefinition(id)

        return {
            props: {
                id,
                data: res.data
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