import { useSignatureInputs } from '../../../../hooks/useSignatureInput'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import Label from '../../../SharedComponents/Label/Label'
import Errors from '../../../SharedComponents/Errors/Errors'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'
import ComponenentContainer from '../../../SharedComponents/ComponentContainer/ComponentContainer'
import LabelContainer from '../../../SharedComponents/LabelContainer/LabelContainer'
import InputsContainer from '../../../SharedComponents/InputsContainer/InputsContainer'
import clsx from 'clsx'
import sharedStyles from '../../../SharedComponents/Signature/Signature.module.css'

export default function ViewSignature({ metadata, value, onChange, errors }) {
    const { name, label, subtitle, disabled, fontStyle, validations } = metadata

    return (
        <ComponenentContainer>
            <LabelContainer>
                <Label label={label} validations={validations} />
            </LabelContainer>
            <InputsContainer>
                <InputText
                    className={clsx('col-12', sharedStyles.signature, errors?.length > 0 && 'p-invalid')}
                    name={name}
                    value={value}
                    onChange={onChange}
                    style={{ fontFamily: fontStyle }}
                    disabled={disabled}
                />
                <Subtitle subtitle={subtitle} />
                <Errors errors={errors} />
            </InputsContainer>
        </ComponenentContainer>
    )
}