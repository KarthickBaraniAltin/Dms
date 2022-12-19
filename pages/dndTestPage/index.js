import Head from 'next/head'
import { Card } from 'primereact/card'
import { DndContext } from '@dnd-kit/core'
import { Droppable } from '../../components/DndComponents/Droppable'
import { Draggable } from '../../components/DndComponents/Draggable'
import Input from '../../components/Input/Input'
import { useInputs } from '../../hooks/useInput'
import createInput from '../../components/DndComponents/createInput'
import { useState } from 'react'

export default function DndTestPage() {
    const [parent, setParent] = useState([])
    const { handleInputChange, inputs } = useInputs()
    // const dragColors = [
    //     {
    //         id: 1,
    //         color: 'Black'
    //     },
    //     {
    //         id: 2,
    //         color: 'Red'
    //     },
    //     {
    //         id: 3,
    //         color: 'Blue'
    //     }
    // ]
    const dragInputs = [
        {
            id: 1,
            type: 'text'
        },
        {
            id: 2,
            type: 'number'
        },
        {
            id: 3,
            type: 'calendar'
        }
    ]

    const draggableItems = dragInputs.map(item => {
        const inputDrag = createInput(item.type, item.id, 'drag')

        for (const element of parent) {
            if (element.id === item.id) {
                return null
            }
        }
        // return <Draggable id={item.id} color={item.color}>{item.color}</Draggable>
        return inputDrag
    })

    const droppableItems = dragInputs.map(item => {
        const inputDrag = createInput(item.type, item.id, 'drag')
        const inputDrop = createInput(item.type, item.id, 'drop')

        for (const element of parent) {
            if (element.id === item.id) {
                // return <Draggable id={item.id} color={item.color}>{item.color}</Draggable>
                return inputDrag
            }
        }

        // return <Droppable id={item.id} color={item.color}>Drop {item.color} here</Droppable>
        return inputDrop
    })

    function handleDragEnd(event) {
        console.log(event)
        const { active, over } = event
        const id = active.id
        // setParent(over ? over.id : null)
        setParent(prevState => {
            if (over === null) { // Removes draggable from droppable when user drags away a draggable from a droppable
                console.log('Made it - over')
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