import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className='bg-primary mt-4 footer-bs'>
        <div className="container text-center">
            <div>
                <Link href='https://www.csn.edu'>
                    <a className='link-light'>www.csn.edu</a>
                </Link>
            </div>
        </div>
    </footer> 
  )
}
