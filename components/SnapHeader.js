import React from 'react'

export default function SnapHeader({text}) {
  return (
    <h2 className='text-center mt-3 text-white'>{text ? text : 'SNAP'}</h2>
  )
}
