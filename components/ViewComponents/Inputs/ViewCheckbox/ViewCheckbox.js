import { Checkbox } from 'primereact/checkbox'
import { useState } from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'

export default function ViewCheckbox({ metadata, value, onChange, errors }) {
    const { name, label, subtitle, guid, id, page } = metadata 
    const [checkedValues, setCheckedValues] = useState([])
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
            <div className='col-4'>
                <Label label={label} />
                <Subtitle subtitle={subtitle} />
            </div>
            <div className='col-8'>
                {metadata.options.length > 0 && 
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
                }
            </div>
            <Errors errors={errors} />
        </div>
    )
}