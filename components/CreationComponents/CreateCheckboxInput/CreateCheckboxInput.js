import { Checkbox } from 'primereact/checkbox'
import { useState } from 'react'
import Errors from '../../SharedComponents/Errors/Errors'
import CreateLabel from '../CreateLabel/CreateLabel'
import CreateSubtitle from '../CreateSubtitle/CreateSubtitle'

export default function CreateCheckboxInput({ metadata, onChange, openDialog, errors }) {
    const { name, label, subtitle, guid, id, page } = metadata 
    const [checkedValues, setCheckedValues] = useState(metadata?.options)
    const [eventObject, setEventObject] = useState({target: {name: name, value: []}})

    const onCheckboxChange = (e) => {
        let selectedCheckbox = [...checkedValues]

        if(e.checked) {
            selectedCheckbox.push(e.value)
        }
        else {
            selectedCheckbox.splice(selectedCheckbox.indexOf(e.value), 1)
        }

        setCheckedValues(selectedCheckbox)

        setEventObject(prevState => {
            let tempState = JSON.parse(JSON.stringify(prevState))
            tempState.target.value = selectedCheckbox
            return tempState
        })

        return { ...eventObject, target: {...eventObject.target, value: selectedCheckbox} }
    }

    return (
        <div style={{width: '198.4px'}}>
            <CreateLabel componentData={metadata} label={label} openDialog={openDialog} />
            {metadata.options.length > 0 ? 
                <div className='flex flex-column'>
                    {metadata.options.map((checkboxes, index) => {
                        return (
                            <div key={index} style={{marginBottom: '0.5rem'}}>
                                <Checkbox key={index} value={checkboxes.value} onChange={(e) => onChange(onCheckboxChange(e))} 
                                checked={eventObject.target.value.some(element => element === checkboxes.value)} style={{marginRight: '0.5rem'}} />
                                <label>{checkboxes.value}</label>
                            </div>
                        )
                    })}
                </div>
                : <p>{'Click dialog to add checkboxes'}</p>
            }
            <CreateSubtitle value={subtitle} />
            <Errors errors={errors} />
        </div>
    )
}