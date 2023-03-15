import { Checkbox } from 'primereact/checkbox'
import { useState } from 'react'
import Errors from '../../SharedComponents/Errors/Errors'
import CreateLabel from '../CreateLabel/CreateLabel'
import CreateSubtitle from '../CreateSubtitle/CreateSubtitle'
import SettingsButton from '../SettingsButton/SettingsButton'

export default function CreateCheckboxInput({ metadata, onChange, openDialog, errors }) {
    const { name, label, subtitle, guid, id, page } = metadata 
    const [checkedValues, setCheckedValues] = useState(metadata?.options)
    const [checkedIds, setCheckedIds] = useState([])
    const [eventObject, setEventObject] = useState({target: {name: name, value: []}})

    const onCheckboxChange = (e) => {
        let selectedCheckbox = [...checkedValues]
        let selectedId = [...checkedIds]

        if(e.checked) {
            selectedCheckbox.push(e.value)
            selectedId.push(e.target.id)
        }
        else {
            selectedCheckbox.splice(selectedCheckbox.indexOf(e.value), 1)
            selectedId.splice(selectedId.indexOf(e.target.id), 1)
        }

        setCheckedValues(selectedCheckbox)
        setCheckedIds(selectedId)

        setEventObject(prevState => {
            let tempState = JSON.parse(JSON.stringify(prevState))
            tempState.target.value = selectedCheckbox
            return tempState
        })

        return { ...eventObject, target: {...eventObject.target, value: selectedCheckbox} }
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
                                    <Checkbox key={index} id={index} value={checkboxes.value} onChange={(e) => onChange(onCheckboxChange(e))} 
                                    checked={checkedIds.some(id => id === index)} style={{marginRight: '0.5rem'}} />
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