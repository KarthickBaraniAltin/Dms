import Head from 'next/head'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useAccount, useMsal, useMsalAuthentication } from "@azure/msal-react"
import { formBuilderApiRequest } from '../../../../../src/msalConfig'
import { getFormData, getFormDefinition } from '../../../../../api/apiCalls'
import { InteractionType } from '@azure/msal-browser'
import { useApi } from '../../../../../hooks/useApi'
import { callMsGraph } from '../../../../../src/MsGraphApiCall'
import { useMemo, useState } from 'react'
import { useInputs } from '../../../../../hooks/useInput'
import { useValidation } from '../../../../../hooks/useValidation'
import { useConvertFormData } from '../../../../../hooks/useConvertFormData'
import useTimeControl from '../../../../../hooks/useTimeControl'
import ViewComponents from '../../../../../components/ViewComponents/ViewComponents/ViewComponents'
import { usePreventSubmit } from '../../../../../hooks/usePreventSubmit'

const api = process.env.NEXT_PUBLIC_FORM_BUILDER_API

export default function FormDataView({ id, metadata, savedData }) {
    
    // This part is displaying the form
    // const { headerImage, handleHeaderImage } = useHeaderImage()
    
    const { convertData } = useConvertFormData()
    const convertedData = convertData(savedData.data)
    
    const { inputs, handleInputChange } = useInputs({ initialValues: convertedData })
    const { errors } = useValidation({ metadata, inputs })

    const { acquireToken } = useMsalAuthentication(InteractionType.Silent, formBuilderApiRequest)
    const { loading, callApiFetch } = useApi()

    const { startViewTime } = useTimeControl()    
    const [ userData, setUserData ] = useState(undefined)
    const { instance, inProgress, accounts } = useMsal()
    const account = useAccount(accounts[0] ?? {})

    const { isDisabled, setIsDisabled, checkErrors } = usePreventSubmit({metadata, inputs})
    const disableSubmitButton = useMemo(() => {
        return checkErrors(errors)
    }, [errors])
      
    useMemo(() => {
        setIsDisabled(disableSubmitButton)
    }, [disableSubmitButton])
    
    useState(() => {
        if (!userData && account) {
            callMsGraph().then(response => setUserData(response)).catch((e) => {
                console.log("Error while getting the user data = ", e)
            })
        }

    }, [inProgress, instance, account, errors]) 

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

        const res = await callApiFetch(`${api}/FormData/${id}`, fetchParams)
    }

    return (
        <>
            <Head>
                <title>View Form Data</title>
                <link rel='icon' sizes='32x32' href='/form-builder-studio/logo.png' />
            </Head>
            <AuthenticatedTemplate>                   
                <div className='grid'>
                    <Card className='card form-horizontal mt-5' style={{'width': '70%'}}>
                        <form>
                            <div className='grid formgrid'>
                                <ViewComponents metadata={metadata} inputs={inputs} handleInputChange={handleInputChange} errors={errors} />
                            </div>
                            {/* <div className='field md:col-6 col-offset-3'>
                                <Button label="Submit" onClick={submitFormData} loading={loading} />
                            </div> */}
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
    const { id, fid } = context.params

    try {
        const resFormDefinition = await getFormDefinition(id)
        const resFormData = await getFormData(fid)

        const savedData = {}   
        Object.keys(resFormData.data).map(key => {
            savedData[key] = resFormData.data[key]
        })

        return {
            props: {
                id,
                metadata: resFormDefinition.data.metadata.metadata,
                savedData,
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