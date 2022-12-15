import Head from 'next/head'
import { Card } from 'primereact/card'
import { DndContext } from '@dnd-kit/core'
import { Droppable } from '../../components/DndComponents/Droppable'
import { Draggable } from '../../components/DndComponents/Draggable'
import { useState } from 'react'

export default function DndTestPage() {
    const [parent, setParent] = useState(null)
    const dragColors = [
        {
            id: 1,
            color: 'Black'
        },
        {
            id: 2,
            color: 'Red'
        },
        {
            id: 3,
            color: 'Blue'
        }
    ]

    const draggableItems = dragColors.map(item => {
        return <Draggable id={item.id} color={item.color}>{item.color}</Draggable>
    })

    const droppableItems = dragColors.map(item => {
        return <Droppable id={item.id} color={item.color}>Drop {item.color} here</Droppable>
    })

    function handleDragEnd(event) {
        const { active, over } = event
        console.log(active.data.current.color)

        setParent(over.id === active.id ? active.id : over.id)
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
                        {parent !== draggableItems[0].props.id ? draggableItems[0] : null}
                        {parent !== draggableItems[1].props.id ? draggableItems[1] : null}
                        {parent !== draggableItems[2].props.id ? draggableItems[2] : null}
                    </Card>
                    <Card className='card form-horizontal mt-5' style={{'width': '50%'}}>
                        {parent === droppableItems[0].props.id ? draggableItems[0] : droppableItems[0]}
                        {parent === droppableItems[1].props.id ? draggableItems[1] : droppableItems[1]}
                        {parent === droppableItems[2].props.id ? draggableItems[2] : droppableItems[2]}
                    </Card>
                </div>
            </DndContext>
        </>
    )
}