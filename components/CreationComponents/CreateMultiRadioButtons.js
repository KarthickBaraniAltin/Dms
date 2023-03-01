import { RadioButton } from 'primereact/radiobutton'
import { useState } from 'react'

export const CreateMultiRadioButtons = ({ metadata, name }) => {
    const component = metadata.find(element => element.name === name)
    const [checkedValue, setCheckedValue] = useState()

    return (
        <div style={{width: '198.4px'}}>
            {component.options.length > 0 ? 
                <div className='flex flex-column'>
                    {component.options.map((radioButton, index) => {
                        return (
                            <div key={index} style={{marginBottom: '0.5rem'}}>
                                <RadioButton value={radioButton.value} name={radioButton.value} onChange={(e) => setCheckedValue(e.value)} checked={checkedValue === radioButton.value} style={{marginRight: '0.5rem'}} />
                                <label>{radioButton.value}</label>
                            </div>
                        )
                    })}
                </div>
                : <p>{'Click dialog to add radiobuttons'}</p>
            }
        </div>
    )
}