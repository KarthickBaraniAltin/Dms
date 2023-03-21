import { Checkbox } from 'primereact/checkbox'
import { useState } from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'

export default function ViewCheckbox({ metadata, value, onChange, errors }) {
    const { name, label, subtitle, guid, id, page } = metadata 
    const [checkedValues, setCheckedValues] = useState(value?.checkbox || [])
    const [checkedIds, setCheckedIds] = useState(value?.ids || [])

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

        return {target: {name, value: {checkbox: selectedCheckbox, ids: selectedIds}}}
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