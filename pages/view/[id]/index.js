import Head from 'next/head'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useAccount, useMsal, useMsalAuthentication } from "@azure/msal-react"
import { formBuilderApiRequest } from '../../../src/msalConfig'
import { getFormDefinition } from '../../../api/apiCalls'
import { InteractionType } from '@azure/msal-browser'
import { useApi } from '../../../hooks/useApi'
import useTimeControl from '../../../hooks/useTimeControl'
import { callMsGraph } from '../../../src/MsGraphApiCall'
import { useEffect, useState } from 'react'
import { useInputs } from '../../../hooks/useInput'
import ViewComponents from '../../../components/ViewComponents/ViewComponents/ViewComponents'
import { useValidation } from '../../../hooks/useValidation'

export default function View({ id, metadata, api, initialValues }) {

    // This part is displaying the form
    // const { headerImage, handleHeaderImage } = useHeaderImage()
    
    const { inputs, handleInputChange } = useInputs({initialValues})
    const { errors } = useValidation({ metadata, inputs })

    const { acquireToken } = useMsalAuthentication(InteractionType.Silent, formBuilderApiRequest)
    const { loading, callApiFetch } = useApi()

    const { startViewTime } = useTimeControl()    
    const [ userData, setUserData ] = useState(undefined)
    const { instance, inProgress, accounts } = useMsal()
    const account = useAccount(accounts[0] ?? {})
    
    useEffect(() => {
        if (!userData && account) {
            callMsGraph().then(response => setUserData(response)).catch((e) => {
                console.log("Error while getting the user data = ", e)
            })
        }
    }, [inProgress, instance, account, userData]) 

    const jsonToFormData = (json) => {
        const convert = (value) => {
            if (typeof value === "string") {
                return value
            } else if (value instanceof Date) {
                return value
            } else {
                return JSON.stringify(value)
            }
        }

        const formData = new FormData()
        for (var key in json) {
            if (key.startsWith('file')) {
                json[key].forEach((file, index) => {
                    formData.append(key + '_' + index, file)
                })
            } else {
                formData.append(key, convert(json[key]))
            }
        }
        return formData
    }

    const submitFormData = async (event) => {
        event.preventDefault()

        const { accessToken } = await acquireToken()
        const { givenName, surname, mail } = instance.getActiveAccount()

        if (userData) {
            inputs.startViewTime = startViewTime 
            inputs.fullLegalName = givenName + " " + surname
            inputs.email = mail
            inputs.securityLevel = "Email, Account Authentication(None)"
        }

        const formData = jsonToFormData(inputs)
        const fetchParams = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }, 
            body: formData
        }

        // const res = await callApiFetch(`/form-builder-studio/api/form-data/${id}`, fetchParams)
        const res = await callApiFetch(`${api}/FormData/${id}`, fetchParams)
    }

    return (
        <>
            <Head>
                <title>View Form</title>
                <link rel='icon' sizes='32x32' href='/form-builder-studio/logo.png' />
            </Head>
            <AuthenticatedTemplate>                   
                <div className='grid'>
                    <Card className='card form-horizontal mt-5' style={{'width': '70%'}}>
                        <form>
                            <div className='grid formgrid'>
                                <ViewComponents metadata={metadata} inputs={inputs} handleInputChange={handleInputChange} errors={errors} />
                            </div>
                            <div className='field md:col-6 col-offset-3'>
                                <Button label="Submit" onClick={submitFormData} loading={loading} />
                            </div>
                        </form>
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

export async function getServerSideProps(context) {
    const { id } = context.params;

    try {
        const res = await getFormDefinition(id)
        
        const initialValues = {}    
        res.data?.metadata?.metadata?.forEach((element) => {
            if (element.defaultValue) {
                initialValues[element.name] = element.defaultValue
            }
        }) 

        return {
            props: {
                id,
                metadata: res.data.metadata.metadata,
                initialValues,
                api: process.env.FORM_BUILDER_API
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