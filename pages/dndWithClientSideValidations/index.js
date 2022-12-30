import { DndContext } from '@dnd-kit/core'
import Head from 'next/head'
import { Card } from 'primereact/card'
import DndLeftPanel from '../../components/DndComponents/DndLeftPanel'
import { Droppable } from '../../components/DndComponents/Droppable'

export default function DndWithClientSideValidations() {
    return (
        <>
            <Head>
                <title>DnD With Client Side Validations</title>
                <link rel='icon' sizes='32x32' href='/component-library/logo.png' />
            </Head>
            <DndContext>
                <div className='grid'>
                    <DndLeftPanel />
                    <Card className='card form-horizontal mt-5' style={{'width': '70%'}}>
                        {/* <Droppable>
                            
                        </Droppable> */}
                    </Card>
                </div>
            </DndContext>
        </>
    )
}