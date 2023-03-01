import { Card } from 'primereact/card'
import { Draggable } from './Draggable'

export default function ComponentPanel() {

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
        'file',
        'richText',
        'subtitle',
        'signature',
        'radiobutton'
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
                    subtitle={JSON.stringify({"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Test Sub","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}})}
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
                    subtitle={JSON.stringify({"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Test Sub","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}})}
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
                    subtitle={JSON.stringify({"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Test Sub","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}})}
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
                    subtitle={JSON.stringify({"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Test Sub","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}})}
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
                    subtitle={JSON.stringify({"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Test Sub","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}})}
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
                    subtitle={JSON.stringify({"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Test Sub","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}})}
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
                    label='Label'
                    subtitle={JSON.stringify({"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Test Sub","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}})}
                    defaultValue=''
                    options={[]}
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
                    subtitle={JSON.stringify({"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Test Sub","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}})}
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
                    label='Label'
                    subtitle={JSON.stringify({"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}})}
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
                    subtitle={JSON.stringify({"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Test Sub","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}})}
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
                    label='Label'
                    subtitle={JSON.stringify({"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Test Sub","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}})}
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

        if (component === 'signature') {
            return (
                <Draggable
                    key={index}
                    id={`${index + 1}`}
                    type={component}
                    name={component}
                    label='Label'
                    subtitle={JSON.stringify({"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Test Sub","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}})}
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
                    label='Label'
                    subtitle={JSON.stringify({"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Test Sub","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}})}
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