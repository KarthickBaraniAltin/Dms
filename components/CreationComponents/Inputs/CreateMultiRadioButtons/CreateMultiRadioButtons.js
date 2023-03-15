import { RadioButton } from 'primereact/radiobutton'
import Errors from '../../../SharedComponents/Errors/Errors'
import CreateLabel from '../../CreateLabel/CreateLabel'
import CreateSubtitle from '../../CreateSubtitle/CreateSubtitle'
import SettingsButton from '../../SettingsButton/SettingsButton'

export default function CreateMultiRadioButtons ({ metadata, openDialog, value, onChange, errors }) {
    const { name, label, subtitle, options } = metadata
    const [checkedValue, setCheckedValue] = useState()

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
                            <div key={index} style={{marginBottom: '0.5rem'}}>
                                <RadioButton key={index} value={radioButton.value} name={name} 
                                    onChange={(e) => {
                                        setCheckedValue(index)
                                        onChange(e)
                                    }} 
                                    checked={checkedValue === index}
                                    style={{marginRight: '0.5rem'}} />
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