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
import { useApi } from "../hooks/useApi"
import { activeDirectoryApiRequest } from '../src/msalConfig';
import { useInputs } from "../hooks/useInput"
import { InteractionType } from "@azure/msal-browser"
import { useEffect, useState } from "react"

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

  const filterUsers = async (e) => {
    if (e.query === undefined) return

    const getData = async() => {
      const { accessToken } = await acquireToken()
      const inputData =  e.query
      // console.log(accessToken)
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

      // instead of setting the result in here we can use useEffect with response dependency
      const result = await callApi(params)
      // console.log("Result = ", result)
      return result
    }

    const res = await getData()
    const filteredRes = res?.data.map(person => person.displayName)
    console.log(filteredRes)
    
    setFilteredUsers(filteredRes)
  }

  return (
    <>
      <Head>
        <title>Component Library</title>
        <link rel='icon' sizes='32x32' href='/component-library/logo.png' />
      </Head>
      <div>
        <AuthenticatedTemplate>
          {/* <Card className='card form-horizontal mt-5' style={{'width': '70%'}}>
            <div className='field'>
              <Button label='Text Hook' loading={loading} onClick={async () => callApiTest()} />
            </div>
          </Card> */}
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