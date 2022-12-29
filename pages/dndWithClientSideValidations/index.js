import { DndContext } from '@dnd-kit/core'
import Head from 'next/head'

export default function DndWithClientSideValidations() {
    return (
        <>
            <Head>
                <title>DnD With Client Side Validations</title>
                <link rel='icon' sizes='32x32' href='/component-library/logo.png' />
            </Head>
            <DndContext>
                
            </DndContext>
        </>
    )
}