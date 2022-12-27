import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import Head from 'next/head'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import React, { useState } from 'react'
import { useFormCreator } from '../../../hooks/useFormCreator'
import { useInputs } from '../../../hooks/useInput'
import { useValidation } from '../../../hooks/useValidation'

export default function Index() {

    const { handleInputChange, inputs } = useInputs()
    const { renderComponents, addMetadata, metadata } = useFormCreator()
    const { errors, validate } = useValidation({ metadata })
    
    const addTextInput = () => {
        addMetadata({
            type: 'text',
            inputProps: {
                name: 'text', 
                onChange: handleInputChange, 
            },
            value: inputs.text ? inputs.text : '',
            label: 'Label ',
            subtitle: 'Some Subtitle'
        })
    }

    const addTextInput2 = () => {
        addMetadata({
            type: 'text2',
            inputProps: {
                name: 'text2', 
                onChange: handleInputChange, 
            },
            value: inputs.text2 ? inputs.text2 : '',
            label: 'Label ',
            subtitle: 'Some Subtitle'
        })
    }

    console.log('Inputs = ', inputs)

    return (
        <>
            <Head>
                <title>Test Page</title>
                <link rel='icon' sizes='32x32' href='/component-library/logo.png' />
            </Head>
            <div>
                <AuthenticatedTemplate>
                    <Card className='card form-horizontal mt-5' style={{'width': '70%'}}>
                        <div className='grid p-fluid form-grid'>
                            { renderComponents() } 
                        </div> 
                        <div className='field col-4 md:col-4'>
                            <Button label='Validate' onClick={() => validate()} />
                        </div>
                        <div className='field col-4 md:col-4'>
                            <Button label='Add Text Input' onClick={() => addTextInput()} />
                        </div>
                        <div className='field col-4 md:col-4'>
                            <Button label='Add Text Input 2' onClick={() => addTextInput()} />
                        </div>
                    </Card>
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
