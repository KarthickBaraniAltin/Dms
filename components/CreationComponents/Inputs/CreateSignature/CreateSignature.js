import { InputText } from 'primereact/inputtext'
import Errors from '../../../SharedComponents/Errors/Errors'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'
import SettingsButton from '../../SettingsButton/SettingsButton'
import ComponenentContainer from '../../../SharedComponents/ComponentContainer/ComponentContainer'
import LabelContainer from '../../../SharedComponents/LabelContainer/LabelContainer'
import InputsContainer from '../../../SharedComponents/InputsContainer/InputsContainer'
import clsx from 'clsx'

import sharedStyles from '../../../SharedComponents/Signature/Signature.module.css'

export default function CreateSignature({ metadata, openDialog, value, onChange, errors }) {
    const { name, label, subtitle, validations, fontStyle, guid, id, page } = metadata

    return (
        <ComponenentContainer>
            <SettingsButton componentData={metadata} openDialog={openDialog} />
            <LabelContainer>
                <Label label={label} validations={validations} />
            </LabelContainer>
            <InputsContainer>
                <InputText 
                    className={clsx('col-12', sharedStyles.signature, errors?.length > 0 && 'p-invalid')} 
                    name={name} 
                    value={value} 
                    onChange={onChange} 
                    style={{fontFamily: fontStyle}}
                />
                <p className={`col-12 ${sharedStyles.paragraph}`} style={{fontFamily: fontStyle}}>{value}</p>
                <Subtitle subtitle={subtitle} />
                <Errors errors={errors} />
            </InputsContainer>
        </ComponenentContainer>
    )
}