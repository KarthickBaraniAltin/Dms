import React from 'react'

export default function Errors({errors, name}) {
    return (
        <>
            {  errors?.map(element => {
                    return (
                        <small key={element} className='p-error block'>{element}</small> 
                    )
                })
            }
        </>
    )
}
