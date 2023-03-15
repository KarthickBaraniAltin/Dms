import { Checkbox } from 'primereact/checkbox'
import { useState } from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import CreateLabel from '../../CreateLabel/CreateLabel'
import CreateSubtitle from '../../CreateSubtitle/CreateSubtitle'
import SettingsButton from '../../SettingsButton/SettingsButton'

export default function CreateCheckbox({ metadata, openDialog, value, onChange, errors }) {
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
        <div className='field grid grid-nogutter'>
            <SettingsButton openDialog={openDialog} componentData={metadata} />
            <div className='col-4'>
                <CreateLabel componentData={metadata} label={label} openDialog={openDialog} />
                <CreateSubtitle value={subtitle} />
            </div>
            <div className='col-8'>
                {metadata.options.length > 0 ? 
                    <>
                        {metadata.options.map((checkboxes, index) => {
                            return (
                                <div key={index} style={{marginBottom: '0.5rem'}}>
                                    <Checkbox value={checkboxes.value} onChange={onCheckboxChange} checked={checkedValues.some(element => element === checkboxes.value)} style={{marginRight: '0.5rem'}} />
                                    <label>{checkboxes.value}</label>
                                </div>
                            )
                        })}
                    </>
                    : <p>{'Click dialog to add checkboxes'}</p>
                }
            </div>
            <Errors errors={errors} />
        </div>
    )
}