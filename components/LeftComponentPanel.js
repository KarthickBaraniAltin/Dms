import { Card } from 'primereact/card'
import { useFormCreator } from '../hooks/useFormCreator'
import { Draggable } from './DndComponents/Draggable'
import { useState, useEffect } from 'react'

export default function LeftComponentPanel() {
    const [ componentMetadata, setComponentMetadata] = useState('')

    const fillWithTestData = () => {
        setComponentMetadata(JSON.stringify([{
                type: 'text',
                name: 'text',
                label: 'Text Label',
                subtitle: 'Text Subtitle',
                defaultValue: 'text default value',
                validations: {
                    minLength: {
                      length: "0"
                    },
                    maxLength: {
                      length: "255"
                    }
                }
            },
            {
                type: 'number',
                name: 'number',
                label: 'Label Number',
                subtitle: 'Number Subtitle',
                defaultValue: 12
            },
            {
                type: 'calendar',
                name: 'calendar',
                dateFormat: 'dd-mm-yy',
                label: 'Calendar Label',
                subtitle: 'Calendar subtitle'
            },
            {
                type: 'calendar',
                name: 'time',
                timeOnly: true,
                hourFormat: '12',
                label: 'Time Input Label',
                subtitle: 'Time subtitle'
            }, 
            {
                type: 'textarea',
                name: 'textarea',
                label: 'Textarea Label',
                subtitle: 'Textarea subtitle',
                defaultValue: 'Textarea default value',
                autoResize: true
            }
        ], null, 2))
    }

    useEffect(() => {
        fillWithTestData()
    }, [])

    const parsedMetadata = JSON.parse(componentMetadata)
    const renderOptions = parsedMetadata.map(component => {
        return <h5>{component.name}</h5>
    })

    return (
        <Card className='card form-horizontal mt-5' style={{'width': '20%'}}>
            
        </Card>
    )
}