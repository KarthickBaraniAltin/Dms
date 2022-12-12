import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsalAuthentication } from "@azure/msal-react"
import Head from 'next/head'
import { Button } from "primereact/button"
import { Card } from 'primereact/card'
import { InputTextarea } from 'primereact/inputtextarea';
import Input from "../../../components/Input/Input"
import { useApi } from "../../../hooks/useApi"
import { loginRequest } from '../../../src/msalConfig';
import { useInputs } from "../../../hooks/useInput"
import { useState, createElement, useEffect } from "react"
import { useFormCreator } from "../../../hooks/useFormCreator"
import { useValidation } from "../../../hooks/useValidation"

export default function Home({ cities }) {

    const { response, error, loading, callApi } = useApi()
    const { metadata, addMetadata, renderComponents, setMetadata } = useFormCreator()
    const { validate, errors } = useValidation({ metadata })

    const [ componentMetadata, setComponentMetadata] = useState('')

    const updateMetadata = () => {        
        try {
            const data = JSON.parse(componentMetadata)
            setMetadata(data)
        } catch (error) {
            console.error("Error Can't parse to JSON = ", error)
        }
    }

    // console.log('Inputs = ', inputs)
    // console.log('Inputs.text = ', inputs.text)
    // console.log('Component Metadata = ', componentMetadata)

    return (
        <>
            <Head>
                <title>Test Page</title>
                <link rel='icon' sizes='32x32' href='/component-library/logo.png' />
            </Head>
            <div>
                <AuthenticatedTemplate>
                    <div className='grid'>
                        <Card className='card form-horizontal mt-5' style={{'width': '30%'}}>
                            <div className='grid formgrid'>
                                <div className='field col-12'>
                                    <InputTextarea name='' style={{'width': '100%'}} value={componentMetadata} onChange={(e) => setComponentMetadata(e.target.value)} autoResize />
                                </div>
                                <div className='col-1'></div>
                                <div className='field col-offset-1 col-4'>
                                    <Button label='Update' onClick={updateMetadata} />
                                </div>
                                <div className='field col-offset-1 col-4'>
                                    <Button label='Validate' onClick={validate} />                            
                                </div>
                            </div>
                        </Card>
                        <Card className='card form-horizontal mt-5' style={{'width': '60%'}}>
                            <div className='grid p-fluid form-grid'>
                                { renderComponents() }
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
            </div>
        </>
    )
} 

export async function getStaticProps() {
   
  const cities = [
    { label: 'Las Vegas', value: 'LV'},
    { label: 'Toronto', value: 'TO'},
    { label: 'New York', value: 'NY' },
    { label: 'Rome', value: 'RM' },
    { label: 'London', value: 'LDN' },
    { label: 'Istanbul', value: 'IST' },
    { label: 'Paris', value: 'PRS' }
  ]

  return {
      props: {
          cities
      }
  }
}