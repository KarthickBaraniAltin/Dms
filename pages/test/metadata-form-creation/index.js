import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsalAuthentication } from "@azure/msal-react"
import Head from 'next/head'
import { Button } from "primereact/button"
import { Card } from 'primereact/card'
import { InputTextarea } from 'primereact/inputtextarea';
import { useApi } from "../../../hooks/useApi"
import { useEffect, useState  } from "react"
import { useFormCreator } from "../../../hooks/useFormCreator"
import TextDialog from "../../../components/Settings/TextDialog/TextDialog";
import { useValidation } from "../../../hooks/useValidation";

export default function Home({  }) {

    const { metadata, addMetadata, renderComponents, setMetadata } = useFormCreator()
    const [ componentMetadata, setComponentMetadata] = useState('')

    const updateMetadata = () => {        
        try {
            const data = JSON.parse(componentMetadata)
            setMetadata(data)
        } catch (error) {
            console.error("Error Can't parse to JSON = ", error)
        }
    }

    useEffect(() => {
        updateMetadata()
    }, [componentMetadata])

    const fillWithTestData = () => {
        setComponentMetadata(JSON.stringify([{
                type: 'text',
                name: 'text',
                label: 'Text Label',
                subtitle: 'Text Subtitle',
                defaultValue: 'text default value',
                validations: {
                    minLength: {
                      length: "0",
                      message: "Error Message"
                    },
                    maxLength: {
                      length: "255"
                    }
                }
            },
            {
                type: 'number',
                name: 'number',
                label: 'Label Number',
                subtitle: 'Number Subtitle',
                defaultValue: 12
            },
            {
                type: 'calendar',
                name: 'calendar',
                dateFormat: 'dd-mm-yy',
                label: 'Calendar Label',
                subtitle: 'Calendar subtitle'
            },
            {
                type: 'calendar',
                name: 'time',
                timeOnly: true,
                hourFormat: '12',
                label: 'Time Input Label',
                subtitle: 'Time subtitle'
            }, 
            {
                type: 'textarea',
                name: 'textarea',
                label: 'Textarea Label',
                subtitle: 'Textarea subtitle',
                defaultValue: 'Textarea default value',
                autoResize: true
            }
        ], null, 2))
    }

    const fetchCurrentMetadata = () => {
        setComponentMetadata(JSON.stringify(metadata, null, 2))
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
                    <TextDialog header="Text Dialog Header" visible={false}  />
                    <div className='grid'>
                        <Card className='card form-horizontal mt-5' style={{'width': '40%'}}>
                            <div className='grid p-fluid form-grid'>
                                <div className='field col-12'>
                                    <InputTextarea name='' style={{'width': '100%'}} value={componentMetadata} onChange={(e) => setComponentMetadata(e.target.value)} autoResize />
                                </div>
                                {/* <div className='col-1'></div>
                                <div className='field col-offset-1 col-4'>
                                    <Button label='Update' onClick={updateMetadata} />
                                </div> */}
                                <div className='field col-offset-2 md:col-8'>
                                    <Button label='Fill with test metadata' onClick={fillWithTestData} />
                                </div>
                                <div className='field col-offset-2 md:col-8'>
                                    <Button label='Fetch current metadata' onClick={fetchCurrentMetadata} />
                                </div>
                            </div>
                        </Card>
                        <Card className='card form-horizontal mt-5' style={{'width': '50%'}}>
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