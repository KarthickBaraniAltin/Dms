import LexicalEditor from '../../../LexicalEditor/LexicalEditor'
import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'
import ComponenentContainer from '../../../SharedComponents/ComponentContainer/ComponentContainer'
import LabelContainer from '../../../SharedComponents/LabelContainer/LabelContainer'
import InputsContainer from '../../../SharedComponents/InputsContainer/InputsContainer'

import styles from '../ViewRichText/ViewRichText.module.css'

export default function ViewRichText({ metadata, value, onChange, errors }) {
    const { name, label, subtitle, guid, id, page } = metadata

    return (
        <ComponenentContainer> 
            <LabelContainer className={`${styles.labelContainer} mr-2`}> 
                <Label label={label} />
            </LabelContainer>
            <InputsContainer className={styles.inputsContainer}>
                <LexicalEditor name={name} value={value} onChange={onChange} /> 
                <Subtitle subtitle={subtitle} />
                <Errors errors={errors} />
            </InputsContainer>
        </ComponenentContainer>
    )
}