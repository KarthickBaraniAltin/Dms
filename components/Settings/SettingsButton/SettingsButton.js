import React from 'react'

export default function SettingsButton({openDialog}) {
  return (
    <i className='pi pi-cog' style={{fontSize: '1em', alignSelf: 'flex-end', marginBottom: '0.25rem'}} onClick={() => openDialog(componentData)}></i>
  )
}
