import { Checkbox } from 'primereact/checkbox'
import { useState } from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'

export default function ViewCheckbox({ metadata, value, onChange, errors }) {
    const { name, label, subtitle, guid, id, page } = metadata 

    let isJson = false
    let parsedValue
    try {
        parsedValue = JSON.parse(value)
        isJson = typeof parsedValue === 'object'
    } catch (error) {
        isJson = false
    }

    const [checkedValues, setCheckedValues] = useState(isJson ? parsedValue?.checkbox : typeof value === 'object' ? value : [])
    const [checkedIds, setCheckedIds] = useState(isJson ? parsedValue?.ids : typeof value === 'object' ? value : [])
    const [eventObject, setEventObject] = useState()

    const onCheckboxChange = (e) => {
        const { checked, value, target: { id } } = e
        let selectedCheckbox = [...checkedValues]
        let selectedIds = [...checkedIds]

        if(checked) {
            selectedCheckbox.push(value)
            selectedIds.push(id)
        }
        else {
            selectedCheckbox = selectedCheckbox.filter((checkboxValue) => checkboxValue !== value)
            selectedIds = selectedIds.filter((checkboxId) => checkboxId !== id)
        }

        setCheckedValues(selectedCheckbox)
        setCheckedIds(selectedIds)

        const newEventObject = {
            target: {
                name,
                value: {checkbox: selectedCheckbox, ids: selectedIds}
            }
        }

        setEventObject(newEventObject)

        return newEventObject
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
                                    <Checkbox 
                                        key={index} 
                                        id={index} 
                                        value={checkboxes.value} 
                                        onChange={(e) => onChange(onCheckboxChange(e))}
                                        checked={checkedIds.some(id => id === index)} 
                                        style={{marginRight: '0.5rem'}}
                                    />
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