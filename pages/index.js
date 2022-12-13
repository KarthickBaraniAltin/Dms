import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsalAuthentication } from "@azure/msal-react"
import Head from 'next/head'
import Link from "next/link"
import { Button } from "primereact/button"
import { Card } from 'primereact/card'
import { Calendar } from 'primereact/calendar'
import { InputMask } from 'primereact/inputmask'
import { InputNumber } from 'primereact/inputnumber'
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import Input from "../components/Input/Input"
import { useApi } from "../hooks/useApi"
import { activeDirectoryApiRequest } from '../src/msalConfig';
import { useInputs } from "../hooks/useInput"
import { InteractionType } from "@azure/msal-browser"
import { useState } from "react"

export default function Home({ cities }) {

  const { response, error, loading, callApi } = useApi()
  const { acquireToken } = useMsalAuthentication(InteractionType.Silent, activeDirectoryApiRequest)
  const { handleInputChange, inputs } = useInputs()
  const [filteredUsers, setFilteredUsers] = useState()
  // const [ filteredCities, setFilteredCities ] = useState()

  const callApiTest = async () => {
    const accessToken = await acquireToken()

    const params = {
        method: 'GET',
        url: '/component-library/api/active-directory',
        headers: { // no need to stringify
            Accept: '*/*',
            Authorization: `Bearer ${accessToken}`
        }
    }

    await callApi(params)
  }

  // const filterCities = function(e) {
  //   let results = cities.filter(city => {
  //     let string = city.label.toLowerCase()
  //     if (string.startsWith(e.query.toLowerCase())) {
  //       return string
  //     }
  //   })

  //   results = results.map(result => result.label)
    
  //   setFilteredCities(results)
  // }

  const filterUsers = function(e) {
    if (e.query === undefined) return

    const getData = async() => {
      const accessToken = await acquireToken()
      const inputData =  e.query
      console.log(accessToken)
      const params = {
        method: 'POST',
       data: {
          filterString: inputData
       },
        url: '/component-library/api/active-directory',
        headers: { // no need to stringify
            Accept: '*/*',
            Authorization: `Bearer ${accessToken}`
        }
      }

    const result = await callApi(params)

      // const response = await fetch('/api/active-directory', {
      //   method: 'POST',
      //   body: JSON.stringify(data),
      //   headers: {
      //     'Authorization': `Bearer ${accessToken}`
      //   }
      // })

      // const result = await response.JSON()


      return result
    }


    setFilteredUsers(getData())
  }

  return (
    <>
      <Head>
        <title>Component Library</title>
        <link rel='icon' sizes='32x32' href='/component-library/logo.png' />
      </Head>
      <div>
        <AuthenticatedTemplate>
          <Card className='card form-horizontal mt-5' style={{'width': '70%'}}>
            <div className='grid p-fluid form-grid'>
              
              <div className='field col-4 md:col-4'>
                <h5>Basic Text</h5>
                <Input 
                  type='text'
                  inputProps={{
                    name: 'text', 
                    onChange: handleInputChange, 
                    value: inputs.text ? inputs.text : '',
                  }}
                  label='Label'
                  // subtitleComponent={<Link href='http://localhost:3000' className='block'>localhost</Link>} 
                />
              </div>  

              <div className='field col-4 md:col-4'>
                <h5>Test 1</h5>
                <Input
                  type='text'
                  inputProps={{
                    name: 'text1',
                    onChange: handleInputChange,
                    value: inputs.text1 ? inputs.text1 : 'default'
                  }}
                  label='Text 1'
                  subtitle='Test Subtitle'
                />
              </div>

              <div className='field col-4 md:col-4'>
                <h5>Number</h5>
                <Input 
                  type='number' 
                  inputProps={{
                    name: 'number',
                    onChange: handleInputChange,
                    value: inputs.number ? inputs.number : undefined,
                    useGrouping: false
                  }}  
                  label='Label'
                  subtitle='Subtitle'
                />
              </div>

              <div className='field col-4 md:col-4'>
                <h5>Mask</h5>
                <Input
                  type='mask'
                  inputProps={{
                    name: 'mask',
                    onChange: handleInputChange,
                    value: inputs.mask ? inputs.mask: '',
                    mask: '(999) 999-9999'
                  }}
                  label='Label'
                  subtitle='subtitle'
                />
              </div>

              <div className='field col-4 md:col-4'>
                <h5>Calendar</h5>
                <Input
                  type='calendar'
                  inputProps={{
                    name: 'date',
                    onChange: handleInputChange,
                    value: inputs.date ? inputs.date : new Date(),
                    dateFormat: 'dd-mm-yy'                
                  }}
                  label='Label'
                  subtitle='Subtitle'
                />
              </div>  

              <div className='field col-4 md:col-4'>
                <h5>Time</h5>
                <Input
                  type='calendar'
                  inputProps={{
                    name: 'time',
                    onChange: handleInputChange,
                    value: inputs.time ? inputs.time : new Date(),
                    timeOnly: true,
                    hourFormat: '12'              
                  }}
                  label='Label'
                  subtitle='Subtitle'
                />
              </div>  

              <div className='field col-12 md:col-12'>
                <h5>Text Area</h5>
                <Input
                  type='textarea'
                  inputProps={{
                    name: 'textarea',
                    onChange: handleInputChange,
                    value: inputs.textarea ? inputs.textarea : '',
                  }}
                  label='Label'
                  subtitle='subtitle'
                />
              </div>

              <div className='field col-4 md:col-4'>
                <h5>Dropdown</h5>
                <Input
                  type='dropdown'
                  inputProps={{
                    name: 'dropdown',
                    options: cities,
                    onChange: handleInputChange,
                    value: inputs.dropdown ? inputs.dropdown : '',
                  }}
                  label='Label'
                  subtitle='subtitle'
                />
              </div>

              <div className='field col-4 md:col-4'>
                <h5>Multiselect</h5>
                <Input
                  type='multiselect'
                  inputProps={{
                    name: 'multiselect',
                    options: cities,
                    onChange: handleInputChange,
                    value: inputs.multiselect ? inputs.multiselect : '',
                    display: 'chip'
                  }}
                  label='Label'
                />
              </div>

              <div className='field col-4 md:col-4'>
                  <h5>AutoComplete</h5>
                  <Input
                    type='autocomplete'
                    inputProps={{
                      name: 'autocomplete',
                      suggestions: filteredUsers,
                      completeMethod: filterUsers,
                      onChange: handleInputChange,
                      value: inputs.autocomplete ? inputs.autocomplete : '',
                      display: 'chip'
                    }}
                    label='Label'
                  />
              </div>
            </div> 
            <div className='field'>
              <Button label='Text Hook' loading={loading} onClick={async () => callApiTest()} />
            </div>

          </Card>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          
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