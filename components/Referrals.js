import React from 'react'
import ReferralRow from './ReferralRow'

export default function Referrals() {
  return (
    <>
        <div className='col-2'></div>
        <table className="table table-sm table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <ReferralRow />
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <ReferralRow />
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <ReferralRow />
                </tr>
            </tbody>
        </table>
    </>
  )
}
