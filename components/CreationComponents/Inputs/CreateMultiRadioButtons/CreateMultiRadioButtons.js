import { RadioButton } from 'primereact/radiobutton'
import Errors from '../../../SharedComponents/Errors/Errors'
import CreateLabel from '../../CreateLabel/CreateLabel'
import CreateSubtitle from '../../CreateSubtitle/CreateSubtitle'
import SettingsButton from '../../SettingsButton/SettingsButton'

export default function CreateMultiRadioButtons ({ metadata, openDialog, value, onChange, errors }) {
    const { name, label, subtitle, options } = metadata
    // const [checkedValue, setCheckedValue] = useState()

    return (
        <div className='field grid grid-nogutter'>
            <SettingsButton openDialog={openDialog} componentData={metadata} />
            <div className='col-4'>
                <CreateLabel componentData={metadata} label={label} openDialog={openDialog} />
                <CreateSubtitle value={subtitle} />
            </div>
            <div className='col-8'>
                {options.length > 0 ? 
                    <>
                        {options.map((radioButton, index) => {
                            return (
                                <div className='col-12' key={index} style={{marginBottom: '0.5rem'}}>
                                    <RadioButton value={radioButton.value} name={radioButton.value} onChange={onChange} checked={value === radioButton.value} style={{marginRight: '0.5rem'}} />
                                    <label>{radioButton.value}</label>
                                </div>
                            )
                        })}
                    </>
                    : <p>{'Click dialog to add radiobuttons'}</p>
                }
            </div>
            <Errors errors={errors} />
        </div>
    )
}