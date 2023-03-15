import { RadioButton } from 'primereact/radiobutton'
import { useState } from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import ViewLabel from '../../ViewLabel/ViewLabel'
import ViewSubtitle from '../../ViewSubtitle/ViewSubtitle'

export default function ViewMultiRadioButtons ({ metadata, onChange, errors }) {
    const { name, label, subtitle, options } = metadata
    const [checkedValue, setCheckedValue] = useState()

    return (
        <div style={{display: 'flex', justifyContent: 'center', columnGap: '0.5rem', width: '198.4px'}}>
            <div>
                <ViewLabel label={label} />
                <ViewSubtitle value={subtitle} />
            </div>
            {options.length > 0 ? 
                <div className='flex flex-column'>
                    {options.map((radioButton, index) => {
                        return (
                            <div key={index} style={{marginBottom: '0.5rem'}}>
                                <RadioButton value={radioButton.value} name={name} 
                                onChange={(e) => {
                                    setCheckedValue(e.target.value)
                                    onChange(e)
                                }} 
                                checked={checkedValue === radioButton.value} 
                                style={{marginRight: '0.5rem'}} />
                                <label>{radioButton.value}</label>
                            </div>
                        )
                    })}
                </div>
                : <p>{'Click dialog to add radiobuttons'}</p>
            }
            <Errors errors={errors} />
        </div>
    )
}