import { InputTextarea } from 'primereact/inputtextarea'
import React from 'react'
import CreateLabel from '../../CreateLabel/CreateLabel'
import CreateSubtitle from '../../CreateSubtitle/CreateSubtitle'
import Errors from '../../../SharedComponents/Errors/Errors'
import SettingsButton from '../../SettingsButton/SettingsButton'

import styles from '../CreateTextarea/CreateTextarea.module.css'
import clsx from 'clsx'

export default function CreateTextarea({metadata, value, onChange, openDialog, errors}) {
  const { name, className, label, subtitle, options, guid, id, page } = metadata

  return (
    <div className='field grid grid-nogutter'>
      <SettingsButton openDialog={openDialog} componentData={metadata} />
      <div className='col-4'>
        <CreateLabel componentData={metadata} label={label} openDialog={openDialog} />
        <CreateSubtitle value={subtitle} />
      </div>
      <InputTextarea name={name} autoResize className={clsx('col-8', styles['my-textarea'])} value={value} onChange={onChange} />
      <Errors errors={errors} />
    </div>
  )
}
