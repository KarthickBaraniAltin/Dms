import { Droppable } from './Droppable'
import { Draggable } from './Draggable'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Calendar } from 'primereact/calendar'
import { useState } from 'react'
import Input from '../Input/Input'

export default function createInput(type, id, dndComponent) {
    const [textValue, setTextValue] = useState()
    const [numberValue, setNumberValue] = useState()
    const [calendarValue, setCalendarValue] = useState()
    // console.log('type:', type)
    // console.log('id:', id)
    // console.log('dndComponent:', dndComponent)
    if (dndComponent === 'drag') {
        if (type === 'text') {
            return (
                <Draggable id={id}>
                    <h5 style={{margin: '0.5rem 0'}}>Text</h5>
                    <InputText
                        value={textValue}
                        onChange={e => setTextValue(e.target.value)}
                    />
                </Draggable>
            )
        }

        if (type === 'number') {
            return (
                <Draggable id={id}>
                    <h5 style={{margin: '0.5rem 0'}}>Number</h5>
                    <InputNumber
                        value={numberValue}
                        onChange={e => setNumberValue(e.target.value)}
                    />
                </Draggable>
            )
        }

        if (type === 'calendar') {
            return (
                <Draggable id={id}>
                    <h5 style={{margin: '0.5rem 0'}}>Calendar</h5>
                    <Calendar
                        value={calendarValue}
                        onChange={e => setCalendarValue(e.target.value)}
                    />
                </Draggable>
            )
        }
    }

    if (dndComponent === 'drop') {
        if (type === 'text') {
            return (
                <Droppable id={id}>
                    <h5>Drop Text here</h5>
                </Droppable>
            )
        }

        if (type === 'number') {
            return (
                <Droppable id={id}>
                    <h5>Drop Number here</h5>
                </Droppable>
            )
        }

        if (type === 'calendar') {
            return (
                <Droppable id={id}>
                    <h5>Drop Calendar here</h5>
                </Droppable>
            )
        }
    }
}