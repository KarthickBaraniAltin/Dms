import { InputText } from 'primereact/inputtext'
import Errors from '../../../SharedComponents/Errors/Errors'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'
import SettingsButton from '../../SettingsButton/SettingsButton'

export default function CreateSignature({ metadata, openDialog, value, onChange, errors }) {
    const { name, label, subtitle, fontStyle, guid, id, page } = metadata

    return (
        <div className='field grid grid-nogutter'>
            <SettingsButton componentData={metadata} openDialog={openDialog} />
            <div className='col-4'>
                <Label label={label} />
                <Subtitle subtitle={subtitle} />
            </div>
            <div className='flex flex-column col-8'>
                <InputText name={name} value={value} onChange={onChange} style={{fontSize: '1rem', marginRight: '0.25rem', fontFamily: fontStyle}}/>
                <div>
                    <p style={{border: '2px solid #004990', padding: '0.5rem', marginRight: '0.5rem', fontFamily: fontStyle}}>{value}</p>
                </div>
            </div>
            <Errors errors={errors} />
        </div>
    )
}