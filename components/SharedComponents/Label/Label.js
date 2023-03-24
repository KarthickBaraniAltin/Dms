import React from 'react'

export default function Label({label}) {

  return (
    <div className="flex justify-content-between mr-1">
        <label className='block' style={{fontWeight: '700', fontSize: '11pt',color: '#000000'}} >
            {label}
        </label>
    </div>
  )
}
