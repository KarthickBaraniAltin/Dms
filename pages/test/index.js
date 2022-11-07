import React from 'react'
import Head from 'next/head'
import { useApi } from '../../hooks/useApi'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { AuthenticatedTemplate } from '@azure/msal-react'
import Input from '../../components/Input/Input'
import { useInputs } from '../../hooks/useInput'
import { useAccessToken } from '../../hooks/useAccessToken'

export default function Home({cities}) {

  const { response, error, loading, validationErrors, callApi } = useApi()
  const { getAccessToken } = useAccessToken()
  const { handleInputChange, inputs } = useInputs()

  const callApiTest = async () => {

        const params = {
            method: 'POST',
            url: 'https://localhost:7001/api/User',
            headers: { 
                'accept': '*/*',
            },
            data: {...inputs}
        }

        await callApi(params)
  }

  //console.log("Response = ", response)
  //console.log("Error = ", error)
  //console.log("Validation Errors = ", validationErrors)

  return (
    <>
      <Head>
          <title>Test Page</title>
          <link rel='icon' sizes='32x32' href='/logo.png' />
      </Head>
      <AuthenticatedTemplate>
        <Card className='card form-horizontal mt-5' style={{width: '80%'}} >
          <div className='grid p-fluid form-grid'>
            
            {/* 1. Create the input fields */}

            {/* FirstName text input field in one row */}
            <div className='field col-12 md:col-12'>
              <Input
                type='text'
                inputProps={{
                  name: 'firstName',
                  onChange: handleInputChange,
                  value: inputs.firstName ? inputs.firstName: ''
                }}
                label='First Name'
                errorMessages={["Error Message"]}
                subtitle='subtitle asdassd'
              />
            </div>
            
            {/* LastName text input field in one row */}
            <div className='field col-12 md:col-12'>
              <Input
                type='text'
                inputProps={{
                  name: 'lastName',
                  onChange: handleInputChange,
                  value: inputs.lastName ? inputs.lastName : ''
                }}
                label='Last Name'
                errorMessages={["Error Message", "Error Message 2"]}
                subtitle='subtitle'
              />
            </div>

            {/* City dropdown from provided cities in half row */}
            <div className='field col-6 md:col-6'>
              <Input
                type='dropdown'
                inputProps={{
                  name: 'city',
                  options: cities,
                  onChange: handleInputChange,
                  value: inputs.city ? inputs.city : ''
                }}
                label='City'
                errorMessages={validationErrors.City}
                subtitle='subtitle'
              />
            </div>

            {/* Mobile Phone with mask (999) 999-9999 in half row*/}
            <div className='field col-6 md:col-6'>
              <Input
                type='mask'
                inputProps={{
                  name: 'mobilePhone',
                  onChange: handleInputChange,
                  value: inputs.mobilePhone ? inputs.mobilePhone : '',
                  mask: '(999) 999-9999'
                }}
                label='Mobile Phone'
                errorMessages={validationErrors.MobilePhone}
                subtitle='subtitle'
              />
            </div>

            <div className='field col-12 md:col-12'>
              <Input
                type='text'
                inputProps={{
                  name: 'department',
                  onChange: handleInputChange,
                  value: inputs.department ? inputs.department : ''
                }}
                label='Department'
                errorMessages={validationErrors.department}
                subtitle='subtitle'
              />
            </div>

            
            {/*2. Make labels bold and color: '#000000' */}
            
            {/*3. Button for calling the test API and center align */}
            <div className='center-align field col-4 md:col-4'>
              <Button label='Create User' loading={loading} onClick={() => callApiTest()} />
            </div>
          </div>
        </Card>
      </AuthenticatedTemplate>
    </>
  )
}

export async function getStaticProps() {
   
  const cities = [
    { label: 'Las Vegas', value: 'LV'},
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
