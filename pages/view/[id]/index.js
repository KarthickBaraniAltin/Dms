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
import { useEffect, useState, useMemo } from 'react'
import { useInputs } from '../../../hooks/useInput'
import ViewComponents from '../../../components/ViewComponents/ViewComponents/ViewComponents'
import { useValidation } from '../../../hooks/useValidation'
import { usePreventSubmit } from '../../../hooks/usePreventSubmit'
import { useConvertFormData } from '../../../hooks/useConvertFormData'

export default function View({ id, metadata, api, initialValues }) {

    // This part is displaying the form
    // const { headerImage, handleHeaderImage } = useHeaderImage()

    const { convertData } = useConvertFormData()
    const convertedData = convertData(initialValues)
    
    const { inputs, handleInputChange } = useInputs({initialValues: convertedData})
    const { errors } = useValidation({ metadata, inputs })

    const { acquireToken } = useMsalAuthentication(InteractionType.Silent, formBuilderApiRequest)
    const { loading, callApiFetch } = useApi()

    const { startViewTime } = useTimeControl()    
    const [ userData, setUserData ] = useState(undefined)
    const { instance, inProgress, accounts } = useMsal()
    const account = useAccount(accounts[0] ?? {})

    const { isDisabled, setIsDisabled, checkErrors } = usePreventSubmit()
    const disableSubmitButton = useMemo(() => {
        return checkErrors(errors)
    }, [errors])
      
    useMemo(() => {
        setIsDisabled(disableSubmitButton)
    }, [disableSubmitButton])

    useEffect(() => {
        if (!userData && account) {
            callMsGraph().then(response => setUserData(response)).catch((e) => {
                console.log("Error while getting the user data = ", e)
            })
        }

    }, [inProgress, instance, account, userData, errors]) 

    const submitFormData = async (event) => {
        event.preventDefault()

        const { accessToken } = await acquireToken()
        const { givenName, surname, mail } = instance.getActiveAccount()
        const formData = new FormData()
        let info = {}
        if (userData) {
            info = {
                startViewTime: startViewTime,
                fullLegalName: givenName + " " + surname,
                email: mail,
                securityLevel: "Email, Account Authentication(None)"
            }
        }
        
        formData.append("info", JSON.stringify(info))
        formData.append("data", JSON.stringify(inputs))
        const fetchParams = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            body: formData
        }

        const res = await callApiFetch(`${api}/FormData/${id}`, fetchParams)
        console.log('res:', res)
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
                            <div className='flex flex-column justify-content-center'>
                                <ViewComponents metadata={metadata} inputs={inputs} handleInputChange={handleInputChange} errors={errors} />
                            </div>
                            <div className='flex justify-content-center mt-5'>
                                <Button disabled={isDisabled} className='col-2' label="Submit" onClick={submitFormData} loading={loading} />
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
        if (res.data?.metadata?.metadata) {
            const metadata = res.data.metadata.metadata;
            Object.keys(metadata).forEach((key) => {
                const element = metadata[key];
                if (element.defaultValue) {
                    initialValues[element.name] = element.defaultValue;
                }
            });
        }

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