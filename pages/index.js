import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react"
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
import { useAccessToken } from "../hooks/useAccessToken"
import { loginRequest } from '../src/msalConfig';
import { useInputs } from "../hooks/useInput"

export default function Home({cities}) {
//test comment - GR 
  const { response, error, loading, callApi } = useApi()
  const { getAccessToken } = useAccessToken()
  const { handleInputChange, inputs } = useInputs()

  const callApiTest = async () => {
    const accessToken = await getAccessToken(loginRequest)

    const params = {
        method: 'GET',
        url: 'https://connect2.csn.edu/snap/api/department',
        headers: { // no need to stringify
            accept: '*/*'
        },
    }

    await callApi(params)
  }

  return (
    <>
      <Head>
        <title>SNAP Component Library</title>
        <link rel='icon' sizes='32x32' href='/logo.png' />
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
                  subtitleComponent={<Link href='http://localhost:3000' className='block'>localhost</Link>} 
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
 



              {/* <div className='field col-4 md:col-12'>
                <h5>Disabled</h5>
                <Input subtitle='subtitle' label='Label' disabled />
              </div>  
              <div className='field col-4 md:col-12'>
                <Input header='Invalid' label='Label' errorMessages={['error message 1', 'error message 2']}/>
              </div>  

              <div className='field col-3 md:col-12'>
                <Input header='Test' label='Input Field' />
              </div> */}

              {/* <div className='field col-4 md:col-12'>
                <h5>Phone</h5>
                <InputMask mask="(999) 999-9999" placeholder="(999) 999-9999" label='label' />
              </div>   */}

              {/* <div className='field col-12 md:col-12'>
                <h5>Text Area</h5>
                <InputTextarea rows={5} cols={30} />
              </div>   */}

              {/* <div className='field col-4 md:col-12'>
                <h5>Dropdown</h5>
                <Dropdown options={cities} optionLabel="name" placeholder="Select a City" />
              </div> 
              <div className='field col-4 md:col-12'>
                <h5>Disabled</h5>
                <Dropdown options={cities} disabled optionLabel="name" placeholder="Select a City" />
                <small className='block'>subtitle</small>
              </div> 
              <div className='field col-4 md:col-12'>
                <h5>Invalid</h5>
                <Dropdown className='p-invalid' disabled options={cities} optionLabel="name" placeholder="Select a City" />
                <small className='p-error block'>error message</small> 
              </div>  

              <div className='field col-4 md:col-12'>
                <h5>Number</h5>
                <InputNumber />
              </div>  
              <div className='field col-4 md:col-12'>
                <h5>(0 - 100)</h5>
                <InputNumber min={0} max={100} />
                <small className='block'>Please give a number between 0 and 100 included</small>
              </div>  
              <div className='field col-4 md:col-12'>
                <h5>Number</h5>
                <InputNumber className='p-invalid' />
                <small className='p-error block'>Invalid input</small> 
              </div>   */}
            </div> 
            


            <div className='field'>
              <Button label='Text Hook' loading={loading} onClick={async () => callApiTest()} />
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