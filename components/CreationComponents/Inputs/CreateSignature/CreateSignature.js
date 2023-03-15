import { InputText } from 'primereact/inputtext'
import Errors from '../../../SharedComponents/Errors/Errors'
import CreateLabel from '../../CreateLabel/CreateLabel'
import CreateSubtitle from '../../CreateSubtitle/CreateSubtitle'
import SettingsButton from '../../SettingsButton/SettingsButton'

export default function CreateSignature({ metadata, openDialog, value, onChange, errors }) {
    const { name, label, subtitle, guid, id, page } = metadata

    return (
        <div className='field grid grid-nogutter'>
            <SettingsButton componentData={metadata} openDialog={openDialog} />
            <div className='col-4'>
                <CreateLabel label={label} />
                <CreateSubtitle value={subtitle} />
            </div>
            <div className='flex flex-column col-8'>
                <InputText name={name} value={value} onChange={onChange} style={{fontSize: '1rem', marginRight: '0.25rem'}}/>
                <div>
                    <p style={{border: '2px solid #004990', padding: '0.5rem', marginRight: '0.5rem'}}>{value}</p>
                </div>
            </div>
            <Errors errors={errors} />
        </div>
    )
}