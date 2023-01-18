import { Card } from 'primereact/card'
import { useInputs } from '../../hooks/useInput'
import Input from '../Input/Input'
import { Draggable } from './Draggable'

export default function ComponentPanel() {
    const { handleInputChange, inputs } = useInputs()

    const componentTypes = [
        'section',
        'text',
        'calendar',
        'number',
        'textarea',
        'mask',
        'dropdown',
        'multiselect'
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
        if (component === 'section') {
            return (
                <Draggable
                    key={index}
                    id={`${index + 1}`}
                    type={component}
                    name={component}
                    label='Section'
                    sectionMetadata={[]}
                >
                    <div>
                        <div className='flex justify-content-between'>
                        <label className='block' style={{fontWeight: '700', color: '#000000'}}>
                            Section
                        </label> 
                        <i className='pi pi-cog' style={{fontSize: '1em'}}></i>
                        </div>
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
                >
                    <div className='field col-4 md:col-4'>
                        <h5>Basic Text</h5>
                        <Input 
                            type='text'
                            inputProps={{
                                name: 'text', 
                                onChange: handleInputChange, 
                                value: inputs.text ? inputs.text : '',
                            }}
                            label='Label'
                        />
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
                >
                    <div className='field col-4 md:col-4'>
                        <h5>Calendar</h5>
                        <Input
                            type='calendar'
                            inputProps={{
                                name: 'date',
                                onChange: handleInputChange,
                                value: inputs.date ? inputs.date : new Date(),
                                dateFormat: 'dd-mm-yy'                
                            }}
                            label='Label'
                            subtitle='Calendar Subtitle'
                        />
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
                >
                    <div className='field col-4 md:col-4'>
                        <h5>Number</h5>
                            <Input 
                                type='number' 
                                inputProps={{
                                    name: 'number',
                                    onChange: handleInputChange,
                                    value: inputs.number ? inputs.number : undefined,
                                    useGrouping: false
                                }}  
                                label='Label'
                                subtitle='Subtitle'
                            />
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
                >
                    <div className='field col-12 md:col-12'>
                        <h5>Text Area</h5>
                            <Input
                                type='textarea'
                                inputProps={{
                                    name: 'textarea',
                                    onChange: handleInputChange,
                                    value: inputs.textarea ? inputs.textarea : '',
                                }}
                                label='Label'
                                subtitle='subtitle'
                            />
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
                >
                    <div className='field col-4 md:col-4'>
                        <h5>Mask</h5>
                            <Input
                                type='mask'
                                inputProps={{
                                    name: 'mask',
                                    onChange: handleInputChange,
                                    value: inputs.mask ? inputs.mask: '',
                                    mask: '(999) 999-9999'
                                }}
                                label='Label'
                                subtitle='subtitle'
                            />
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
                >
                    <div className='field col-4 md:col-4'>
                        <h5>Dropdown</h5>
                            <Input
                                type='dropdown'
                                inputProps={{
                                    name: 'dropdown',
                                    options: cities,
                                    onChange: handleInputChange,
                                    value: inputs.dropdown ? inputs.dropdown : '',
                                }}
                                label='Label'
                                subtitle='subtitle'
                            />
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
                >
                    <div className='field col-4 md:col-4'>
                        <h5>Multiselect</h5>
                            <Input
                                type='multiselect'
                                inputProps={{
                                    name: 'multiselect',
                                    options: cities,
                                    onChange: handleInputChange,
                                    value: inputs.multiselect ? inputs.multiselect : '',
                                    display: 'chip'
                                }}
                                label='Label'
                            />
                    </div>
                </Draggable>
            )
        }
    })

    const sectionPanel = (
        <div>
            <div className='flex justify-content-between'>
            <label className='block' style={{fontWeight: '700', color: '#000000'}}>
                Section Panel
            </label> 
            <i className='pi pi-cog' style={{fontSize: '1em'}}></i>
            </div>
        </div>
    )

    return (
        <Card className='card form-horizontal mt-5' style={{'width': '30%'}}>
            <Card style={{'background': '#004990', 'color': 'white', 'margin-bottom': '0.5rem'}}>
                <h1 style={{'text-align': 'center'}}>Components</h1>
            </Card>
            {draggableItems}
        </Card>
    )
}