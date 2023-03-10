import { RadioButton } from 'primereact/radiobutton'
import Errors from '../../SharedComponents/Errors/Errors'
import CreateLabel from '../CreateLabel/CreateLabel'
import CreateSubtitle from '../CreateSubtitle/CreateSubtitle'

export default function CreateMultiRadioButtons ({ metadata, openDialog, value, onChange, errors }) {
    const { name, label, subtitle, options } = metadata
    // const [checkedValue, setCheckedValue] = useState()

    return (
        <div style={{width: '198.4px'}}>
            <CreateLabel componentData={metadata} label={label} openDialog={openDialog} />
            {options.length > 0 ? 
                <div className='flex flex-column'>
                    {options.map((radioButton, index) => {
                        return (
                            <div key={index} style={{marginBottom: '0.5rem'}}>
                                <RadioButton value={radioButton.value} name={radioButton.value} onChange={onChange} checked={value === radioButton.value} style={{marginRight: '0.5rem'}} />
                                <label>{radioButton.value}</label>
                            </div>
                        )
                    })}
                </div>
                : <p>{'Click dialog to add radiobuttons'}</p>
            }
            <CreateSubtitle value={subtitle} />
            <Errors errors={errors} />
        </div>
    )
}