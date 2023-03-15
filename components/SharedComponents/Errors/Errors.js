import React from 'react'

export default function Errors({errors, name}) {
    return (
        <>
            {errors && 
                <div className='col-12 mt-3'>
                    {  errors?.map(element => {
                            return (
                                <small key={element} className='p-error block'>{element}</small> 
                            )
                        })
                    }
                </div>
            }
        </>
    )
}
