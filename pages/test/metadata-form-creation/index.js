import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsalAuthentication } from "@azure/msal-react"
import Head from 'next/head'
import Link from "next/link"
import { InputText } from 'primereact/inputtext'
import { Button } from "primereact/button"
import { Card } from 'primereact/card'
import { Calendar } from 'primereact/calendar'
import { InputMask } from 'primereact/inputmask'
import { InputNumber } from 'primereact/inputnumber'
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import Input from "../../../components/Input/Input"
import { useApi } from "../../../hooks/useApi"
import { loginRequest } from '../../../src/msalConfig';
import { useInputs } from "../../../hooks/useInput"
import { useState, createElement, useEffect } from "react"
import { InteractionType } from "@azure/msal-browser"
import { MultiSelect } from "primereact/multiselect"
import { useFormCreator } from "../../../hooks/useFormCreator"

export default function Home({ cities }) {

    const { response, error, loading, callApi } = useApi()
    const { handleInputChange, inputs } = useInputs()
    const { metadata, addMetadata, renderComponents } = useFormCreator()
    const [ componentMetadata, setComponentMetadata] = useState('')
    const [ curIndex, setCurIndex ] = useState(0)

    // Text comment
    const addTextInput = () => {
        addMetadata({
            type: 'text',
            inputProps: {
                name: 'text' + curIndex,
                onChange: handleInputChange, 
                // value: inputs.text ? inputs.text : ''
            },
            value: inputs['text' + curIndex] ? inputs['text' + curIndex] : '',
            label: 'Label ' + curIndex,
            subtitle: 'Some Subtitle'
        })

        setCurIndex(curIndex + 1)
    }

    const addNumberInput = () => {
        addMetadata({
            type: 'number',
            // inputProps: {
            //     name: 'number' + curIndex,
            //     onChange: handleInputChange,
            //     value: inputs['number' + curIndex] ? inputs['number' + curIndex] : ''
            // },
            label: 'Number ' + curIndex,
            subtitle: 'Some Subtitle'
        })

        setCurIndex(curIndex + 1)
    }

    const callApiTest = async () => {
        const params = {
            method: 'GET',
            url: 'https://connect2.csn.edu/snap/api/department',
            headers: { // no need to stringify
                accept: '*/*'
            },
        }

        await callApi(params)
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
                    <div className='grid p-fluid form-grid'>
                        <Card className='card form-horizontal mt-5' style={{'width': '30%'}}>
                            <div className='field col-12'>
                                <InputTextarea name='' value={componentMetadata} onChange={(e) => setComponentMetadata(e.target.value)} autoResize />
                            </div>
                            <div className='field col-6 col-offset-3'>
                                <Button label='Add' loading={loading} onClick={() => addNumberInput()} />
                            </div>
                        </Card>
                        <Card className='card form-horizontal mt-5' style={{'width': '60%'}}>
                            <div className='grid p-fluid form-grid'>
                                { renderComponents() }
                                <div className='field col-3 md:col-3'>
                                    <Button label='Add Text Input' loading={loading} onClick={() => addTextInput()} />
                                </div>
                                <div className='field col-3 md:col-3'>
                                    <Button label='Add Number Input' loading={loading} onClick={() => addNumberInput()} />
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