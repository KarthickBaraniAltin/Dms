import { Checkbox } from 'primereact/checkbox'
import { useState } from 'react'

export const CreateCheckbox = ({ metadata, name }) => {
    const component = metadata.find(element => element.name === name)
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

    console.log('component:', component)
    console.log('checkedValues:', checkedValues)

    return (
        <div style={{width: '198.4px'}}>
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
        </div>
    )
}