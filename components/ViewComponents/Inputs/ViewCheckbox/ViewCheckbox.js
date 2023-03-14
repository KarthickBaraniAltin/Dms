import { Checkbox } from 'primereact/checkbox'
import { useState } from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import ViewLabel from '../../ViewLabel/ViewLabel'
import ViewSubtitle from '../../ViewSubtitle/ViewSubtitle'

export default function ViewCheckbox({ metadata, errors }) {
    const { name, label, subtitle, guid, id, page } = metadata 
    const [checkedValues, setCheckedValues] = useState(metadata?.options)

    const onCheckboxChange = (e) => {
        let selectedCheckbox = [...checkedValues];
        if(e.checked) {
            selectedCheckbox.push(e.value)
        }
        else
            selectedCheckbox.splice(selectedCheckbox.indexOf(e.value), 1)
    
        setCheckedValues(selectedCheckbox)
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', columnGap: '0.5rem', width: '198.4px'}}>
            <div>
                <ViewLabel label={label} />
                <ViewSubtitle value={subtitle} />
            </div>
            {metadata.options.length > 0 ? 
                <div className='flex flex-column'>
                    {metadata.options.map((checkboxes, index) => {
                        return (
                            <div key={index} style={{marginBottom: '0.5rem'}}>
                                <Checkbox value={checkboxes.value} onChange={onCheckboxChange} checked={checkedValues.some(element => element === checkboxes.value)} style={{marginRight: '0.5rem'}} />
                                <label>{checkboxes.value}</label>
                            </div>
                        )
                    })}
                </div>
                : <p>{'Click dialog to add checkboxes'}</p>
            }
            <Errors errors={errors} />
        </div>
    )
}