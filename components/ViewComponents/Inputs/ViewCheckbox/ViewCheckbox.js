import { Checkbox } from 'primereact/checkbox'
import { useState } from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'

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
                                    <Checkbox value={checkboxes.value} onChange={onCheckboxChange} checked={checkedValues.some(element => element === checkboxes.value)} style={{marginRight: '0.5rem'}} />
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