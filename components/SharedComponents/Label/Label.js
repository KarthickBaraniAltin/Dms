import React from 'react'

export default function Label({label}) {
  return (
    <div>
        <label className='block' style={{fontWeight: '700', color: '#000000'}}>
            {label}
        </label>
    </div>
  )
}
