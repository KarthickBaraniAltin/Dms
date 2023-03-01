import Head from 'next/head'
import { useEffect } from 'react'
import { useFormCreator } from '../../../../../../hooks/useFormCreator'
import { Card } from 'primereact/card'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsalAuthentication } from "@azure/msal-react"
import { formBuilderApiRequest } from '../../../../../../src/msalConfig'
import { getFormData, getFormDefinition } from '../../../../../../api/apiCalls'
import { InteractionType } from '@azure/msal-browser'
import { useApi } from '../../../../../../hooks/useApi'

export default function View({ formData, formDefinition }) {

    const { metadata, setMetadata } = useFormCreator()
    const { acquireToken } = useMsalAuthentication(InteractionType.Silent, formBuilderApiRequest)
    const { response, error, loading, callApi } = useApi()
    
    useEffect(() => {
        setMetadata(formDefinition.metadata.metadata)
        setInputs(formData.data)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formDefinition.metadata])

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
                            {/* {renderPreview()} */}
                            <div className='field md:col-6 col-offset-3'>
                                {/* <Button label="Submit" onClick={submitFormData} loading={loading} /> */}
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
    const { id, did } = context.params;

    try {
        const formDefinition = await getFormDefinition(id)
        const formData = await getFormData(did)

        return {
            props: {
                id,
                formDefinition: formDefinition.data,
                formData: formData.data
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