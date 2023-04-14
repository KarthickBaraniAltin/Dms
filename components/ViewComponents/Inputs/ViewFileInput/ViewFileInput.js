import React from 'react'
import Errors from '../../../SharedComponents/Errors/Errors'
import Label from '../../../SharedComponents/Label/Label'
import Subtitle from '../../../SharedComponents/Subtitle/Subtitle'
import ComponenentContainer from '../../../SharedComponents/ComponentContainer/ComponentContainer'
import clsx from 'clsx'
import LabelContainer from '../../../SharedComponents/LabelContainer/LabelContainer'
import InputsContainer from '../../../SharedComponents/InputsContainer/InputsContainer'

import sharedStyles from '../../../SharedComponents/File/File.module.css'

export default function ViewFileInput({ metadata, value, onChange, errors }) {
  const { name, label, subtitle, multiple, validations } = metadata

  return (
    <ComponenentContainer>
      <LabelContainer className={sharedStyles.labelContainer}>
        <Label label={label} validations={validations} />
      </LabelContainer>
      <InputsContainer>
        <input
            name={name} 
            className={clsx('col-12', sharedStyles.file, errors?.length > 0 && 'p-invalid')} 
            type='file' 
            value={value}
            onChange={onChange}
            multiple={multiple}
        />
        <Subtitle subtitle={subtitle} />
        <Errors errors={errors} />
      </InputsContainer>
    </ComponenentContainer>
  )
}
