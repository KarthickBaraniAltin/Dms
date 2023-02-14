import { Card } from 'primereact/card'
import { useInputs } from '../../hooks/useInput'
import Input from '../Input/Input'
import { Draggable } from './Draggable'

export default function ComponentPanel() {
    const { handleInputChange, inputs } = useInputs()

    const componentTypes = [
        'header',
        'section',
        'text',
        'calendar',
        'number',
        'textarea',
        'mask',
        'dropdown',
        'multiselect',
        'file'
    ]
    const cities = [
        { label: 'Las Vegas', value: 'LV'},
        { label: 'Toronto', value: 'TO'},
        { label: 'New York', value: 'NY' },
        { label: 'Rome', value: 'RM' },
        { label: 'London', value: 'LDN' },
        { label: 'Istanbul', value: 'IST' },
        { label: 'Paris', value: 'PRS' }
      ]

    const draggableItems = componentTypes.map((component, index) => {
        if (component === 'header') {
            return (
                <Draggable
                    key={index}
                    id={`${index + 1}`}
                    type={component}
                    name={component}
                    label='Header'
                    guid=''
                >
                    <div className='flex justify-content-center'>
                        <label className='block' style={{fontWeight: '700', color: '#000000'}}>
                            Header
                        </label> 
                    </div>
                </Draggable>
            )
        }

        if (component === 'section') {
            return (
                <Draggable
                    key={index}
                    id={`${index + 1}`}
                    type={component}
                    name={component}
                    label='Section'
                    sectionMetadata={[]}
                    guid=''
                >
                    <div className='flex justify-content-center'>
                        <label className='block' style={{fontWeight: '700', color: '#000000'}}>
                            Section
                        </label> 
                    </div>
                </Draggable>
            )
        }

        if (component === 'text') {
            return (
                <Draggable
                    key={index}
                    id={`${index + 1}`}
                    type={component}
                    name={component}
                    label='Label'
                    subtitle='Text Subtitle'
                    defaultValue=''
                    guid=''
                >
                    <div className='flex justify-content-center'>
                        <label className='block' style={{fontWeight: '700', color: '#000000'}}>
                            Text
                        </label> 
                    </div>
                </Draggable>
            )
        }

        if (component === 'calendar') {
            return (
                <Draggable
                    key={index}
                    id={`${index + 1}`}
                    type={component}
                    name={component}
                    label='Label'
                    subtitle='Subtitle'
                    defaultValue=''
                    dateFormat='dd-mm-yy'
                    minDate=''
                    maxDate=''
                    guid=''
                >
                    <div className='flex justify-content-center'>
                        <label className='block' style={{fontWeight: '700', color: '#000000'}}>
                            Calendar
                        </label> 
                    </div> 
                </Draggable>
            )
        }

        if (component === 'number') {
            return (
                <Draggable
                    key={index}
                    id={`${index + 1}`}
                    type={component}
                    name={component}
                    label='Label'
                    subtitle='Number Subtitle'
                    defaultValue=''
                    format={false}
                    guid=''
                >
                    <div className='flex justify-content-center'>
                        <label className='block' style={{fontWeight: '700', color: '#000000'}}>
                            Number
                        </label> 
                    </div>
                </Draggable>
            )
        }

        if (component === 'textarea') {
            return (
                <Draggable
                    key={index}
                    id={`${index + 1}`}
                    type={component}
                    name={component}
                    label='Label'
                    subtitle='Textarea Subtitle'
                    defaultValue=''
                    guid=''
                >
                    <div className='flex justify-content-center'>
                        <label className='block' style={{fontWeight: '700', color: '#000000'}}>
                            Textarea
                        </label> 
                    </div>
                </Draggable>
            )
        }

        if (component === 'mask') {
            return (
                <Draggable
                    key={index}
                    id={`${index + 1}`}
                    type={component}
                    name={component}
                    label='Label'
                    subtitle='Mask Subtitle'
                    defaultValue=''
                    mask='(999) 999-9999'
                    guid=''
                >
                    <div className='flex justify-content-center'>
                        <label className='block' style={{fontWeight: '700', color: '#000000'}}>
                            Mask
                        </label> 
                    </div>
                </Draggable>
            )
        }

        if (component === 'dropdown') {
            return (
                <Draggable
                    key={index}
                    id={`${index + 1}`}
                    type={component}
                    name={component}
                    label='Label'
                    subtitle='Dropdown Subtitle'
                    defaultValue=''
                    options={cities}
                    guid=''
                >
                    <div className='flex justify-content-center'>
                        <label className='block' style={{fontWeight: '700', color: '#000000'}}>
                            Dropdown
                        </label> 
                    </div>
                </Draggable>
            )
        }

        if (component === 'multiselect') {
            return (
                <Draggable
                    key={index}
                    id={`${index + 1}`}
                    type={component}
                    name={component}
                    label='Label'
                    subtitle='Multiselect Subtitle'
                    defaultValue=''
                    options={cities}
                    display='chip'
                    guid=''
                >
                    <div className='flex justify-content-center'>
                        <label className='block' style={{fontWeight: '700', color: '#000000'}}>
                            Multiselect
                        </label> 
                    </div>
                </Draggable>
            )
        }

        if (component === 'file') {
            return (
                <Draggable
                    key={index}
                    id={`${index + 1}`}
                    type={component}
                    name={component}
                    label='Label'
                    subtitle='File Subtitle'
                    guid=''
                >
                    <div className='flex justify-content-center'>
                        <label className='block' style={{fontWeight: '700', color: '#000000'}}>
                            File
                        </label> 
                    </div>
                </Draggable>
            )
        }
    })

    return (
        <Card className='card form-horizontal mt-5' style={{'width': '30%'}}>
            <Card style={{'background': '#004990', 'color': 'white', marginBottom: '0.5rem'}}>
                <h1 style={{textAlign: 'center'}}>Components</h1>
            </Card>
            {draggableItems}
        </Card>
    )
}