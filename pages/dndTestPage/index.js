import Head from 'next/head'
import { Card } from 'primereact/card'
import { DndContext } from '@dnd-kit/core'
import { Droppable } from '../../components/DndComponents/Droppable'
import { Draggable } from '../../components/DndComponents/Draggable'
import { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { InputTextarea } from 'primereact/inputtextarea'

export default function DndTestPage() {
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
    const [parent, setParent] = useState([])

    const draggableItems = dragColors.map(item => {
        for (const element of parent) {
            if (element.id === item.id) {
                return null
            }
        }

        return <Draggable id={item.id} color={item.color}>{item.color}</Draggable>
    })

    const droppableItems = dragColors.map(item => {
        for (const element of parent) {
            if (element.id === item.id) {
                return <Draggable id={item.id} color={item.color}>{item.color}</Draggable>
            }
        }

        return <Droppable id={item.id} color={item.color}>Drop {item.color} here</Droppable>
    })

    function handleDragEnd(event) {
        const { active, over } = event
        const id = active.id
        // setParent(over ? over.id : null)
        setParent(prevState => {
            if (over === null) { // Removes draggable from droppable when user drags away a draggable from a droppable
                const result = prevState.filter(component => component.id !== id)
                return result
            }

            return [
                ...prevState,
                {
                    id: id
                }
            ]
        })
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
                        {draggableItems}
                    </Card>
                    <Card className='card form-horizontal mt-5' style={{'width': '50%'}}>
                        {droppableItems}
                    </Card>
                </div>
            </DndContext>
        </>
    )
}