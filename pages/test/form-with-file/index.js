import { AuthenticatedTemplate } from '@azure/msal-react'
import Head from 'next/head'
import { Card } from 'primereact/card'
import React from 'react'

export default function index() {
  return (
    <>
        <Head>
            <title>Form File Upload Test</title>
            <link rel='icon' sizes='32x32' href='/logo.png' />
        </Head>
        <AuthenticatedTemplate>
            <Card className='card form-horizontal mt-5' style={{width: '50%'}} >
                <form>
                    <div className='grid p-fluid form-grid'>
                        
                    </div>
                </form>
            </Card>
        </AuthenticatedTemplate>
    </>
    
  )
}
