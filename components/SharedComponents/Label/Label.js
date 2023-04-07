import React from 'react'

export default function Label({label, validations}) {

  return (
    <div className="flex justify-content-between mr-1">
        <div className='block'>
            <label style={{fontWeight: '700', fontSize: '11pt',color: '#000000'}} >
                {label}
            </label>
            <span style={{color: 'red'}}>{validations?.required?.isRequired ? `*` : null}</span>
        </div>
    </div>
  )
}
