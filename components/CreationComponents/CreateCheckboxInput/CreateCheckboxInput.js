import { Checkbox } from 'primereact/checkbox'
import { useState } from 'react'
import Errors from '../../SharedComponents/Errors/Errors'
import CreateLabel from '../CreateLabel/CreateLabel'
import CreateSubtitle from '../CreateSubtitle/CreateSubtitle'

export default function CreateCheckboxInput({ metadata, openDialog, value, onChange, errors }) {
    const { name, label, subtitle, guid, id, page } = metadata 
    const [checkedValues, setCheckedValues] = useState(component?.options)

    const onCheckboxChange = (e) => {
        console.log('event(onCheckboxChange):', e)
        let selectedCheckbox = [...checkedValues];
        if(e.checked)
            selectedCheckbox.push(e.value);
        else
            selectedCheckbox.splice(selectedCheckbox.indexOf(e.value), 1);
    
        setCheckedValues(selectedCheckbox);
    }

    return (
        <div style={{width: '198.4px'}}>
            <CreateLabel componentData={metadata} label={label} openDialog={openDialog} />
            {component.options.length > 0 ? 
                <div className='flex flex-column'>
                    {component.options.map((checkboxes, index) => {
                        return (
                            <div key={index} style={{marginBottom: '0.5rem'}}>
                                <Checkbox onChange={onCheckboxChange} checked={checkedValues[index].value} style={{marginRight: '0.5rem'}} />
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