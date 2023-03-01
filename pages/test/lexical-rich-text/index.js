import { AuthenticatedTemplate } from "@azure/msal-react"
import  LexicalEditor from '../../../components/LexicalEditor/LexicalEditor'
import Head from "next/head"
import { Card } from "primereact/card"

export default function Home() {
    return (
        <>
            <Head>
                <title>Form Data Dashboard</title>
                <link rel='icon' sizes='32x32' href='/form-builder-studio/logo.png' />
            </Head>
            <div>
                <AuthenticatedTemplate>
                    <div>
                        <Card className='card w-75 form-horizontal mt-2 mb-3' style={{'width': '90%'}} >
                            <div className='card-body'>
                                <LexicalEditor />
                            </div>
                        </Card>
                    </div>
                </AuthenticatedTemplate>
            </div>
        </>
    )
}
