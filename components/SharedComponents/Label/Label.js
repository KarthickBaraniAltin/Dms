import React from 'react'

import styles from '../Label/Label.module.css'

export default function Label({label, validations}) {

  return (
    <>
        <label className={styles.labelStyle} >
            {label}
        </label>
        <span className={styles.asteriks}>{validations?.required?.isRequired ? ` *` : null}</span>
    </> 
  )
}
