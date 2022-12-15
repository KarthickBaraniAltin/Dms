import Head from 'next/head'
import { Card } from 'primereact/card'
import { DndContext } from '@dnd-kit/core'
import { Droppable } from '../../components/DndComponents/Droppable'
import { Draggable } from '../../components/DndComponents/Draggable'
import { useState } from 'react'

export default function DndTestPage() {
    const [isDropped, setIsDropped] = useState(false);
    const draggableMarkup = (
      <Draggable>Drag me</Draggable>
    )

    function handleDragEnd(event) {
        if (event.over && event.over.id === 'droppable') {
          setIsDropped(true)
        }
      }

    return (
        <>
            <Head>
                <title>DnD Test Page</title>
                <link rel='icon' sizes='32x32' href='/component-library/logo.png' />
            </Head>
            <DndContext onDragEnd={handleDragEnd}>
                <div className='flex space-around'>
                    <Card className='card form-horizontal mt-5' style={{'width': '25%'}}>
                        {!isDropped ? draggableMarkup : null}
                    </Card>
                    <Card className='card form-horizontal mt-5' style={{'width': '50%'}}>
                        <Droppable>
                            {isDropped ? draggableMarkup : 'Drop here'}
                        </Droppable>
                    </Card>
                </div>
            </DndContext>
        </>
    )
}