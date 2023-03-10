import { Card } from 'primereact/card'
import { Draggable } from './Draggable'

export default function ComponentPanel() {

    const componentTypes = [
        'header',
        'text',
        'calendar',
        'time',
        'number',
        'textarea',
        'mask',
        'dropdown',
        'multiselect',
        'file',
        'richText',
        'subtitle',
        'signature',
        'radiobutton',
        'checkbox'
    ]

    const defaultSubtitle = JSON.stringify({"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Test Sub","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}})

    const draggableItems = componentTypes.map((component, index) => {
        if (component === 'header') {
            return (
                <Draggable
                    key={index}
                    id={`${index + 1}`}
                    type={component}
                    name={component}
                    guid=''
                    columnSize='field col-12'
                >
                    <div className='flex justify-content-center'>
                        <label className='block' style={{fontWeight: '700', color: '#000000'}}>
                            Header
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
                    columnSize='field col-6'
                    label='Label'
                    subtitle={defaultSubtitle}
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
                    columnSize='field col-6'
                    label='Label'
                    subtitle={defaultSubtitle}
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

        if (component === 'time') {
            return (
                <Draggable
                    key={index}
                    id={`${index + 1}`}
                    type={component}
                    name={component}
                    label='Label'
                    subtitle={JSON.stringify({"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Test Sub","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}})}
                    defaultValue=''
                    showTime
                    timeOnly
                    hourFormat='12'
                    minDate=''
                    maxDate=''
                    guid=''
                >
                    <div className='flex justify-content-center'>
                        <label className='block' style={{fontWeight: '700', color: '#000000'}}>
                            Time
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
                    columnSize='field col-6'
                    label='Label'
                    subtitle={defaultSubtitle}
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
                    columnSize='field col-12'
                    label='Label'
                    subtitle={defaultSubtitle}
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
                    columnSize='field col-6'
                    label='Label'
                    subtitle={defaultSubtitle}
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
                    columnSize='field col-6'
                    label='Label'
                    subtitle={defaultSubtitle}
                    defaultValue=''
                    options={[]}
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
                    columnSize='field col-6'
                    label='Label'
                    subtitle={defaultSubtitle}
                    defaultValue=''
                    options={[]}
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
                    columnSize='field col-6'
                    label='Label'
                    subtitle={defaultSubtitle}
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

        if (component === 'richText') {
            return (
                <Draggable
                    key={index}
                    id={`${index + 1}`}
                    type={component}
                    name={component}
                    columnSize='field col-12'
                    label='Label'
                    subtitle={defaultSubtitle}
                    guid=''
                >
                    <div className='flex justify-content-center'>
                        <label className='block' style={{fontWeight: '700', color: '#000000'}}>
                            Rich Text
                        </label> 
                    </div>
                </Draggable>
            )
        }

        if (component === 'subtitle') {
            return (
                <Draggable
                    key={index}
                    id={`${index + 1}`}
                    type={component}
                    name={component}
                    columnSize='field col-12'
                    subtitle={defaultSubtitle}
                    guid=''
                >
                    <div className='flex justify-content-center'>
                        <label className='block' style={{fontWeight: '700', color: '#000000'}}>
                            Subtitle
                        </label> 
                    </div>
                </Draggable>
            )
        }

        if (component === 'signature') {
            return (
                <Draggable
                    key={index}
                    id={`${index + 1}`}
                    type={component}
                    name={component}
                    columnSize='field col-6'
                    label='Label'
                    subtitle={defaultSubtitle}
                    guid=''
                >
                    <div className='flex justify-content-center'>
                        <label className='block' style={{fontWeight: '700', color: '#000000'}}>
                            Signature
                        </label> 
                    </div>
                </Draggable>
            )
        }

        if (component === 'radiobutton') {
            return (
                <Draggable
                    key={index}
                    id={`${index + 1}`}
                    type={component}
                    name={component}
                    columnSize='field col-6'
                    label='Label'
                    subtitle={defaultSubtitle}
                    options={[]}
                    guid=''
                >
                    <div className='flex justify-content-center'>
                        <label className='block' style={{fontWeight: '700', color: '#000000'}}>
                            RadioButton
                        </label>
                    </div>
                </Draggable>
            )
        }

        if (component === 'checkbox') {
            return (
                <Draggable
                    key={index}
                    id={`${index + 1}`}
                    type={component}
                    name={component}
                    label='Label'
                    subtitle={JSON.stringify({"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Test Sub","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}})}
                    columnSize='field col-6'
                    options={[]}
                    guid=''
                >
                    <div className='flex justify-content-center'>
                        <label className='block' style={{fontWeight: '700', color: '#000000'}}>
                            Checkbox
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