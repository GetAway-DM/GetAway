import React from 'react'
import './listing.css'

const Rules = () => {

    return (
            <div className='rules'>
                <div className='rules-box'>
                <div>
                <h1>Things to Know</h1>
                </div>
                    <ul className="list-box">
                    <h4>House Rules</h4>
                    <li>Check-in: After 3:00PM</li>
                    </ul>
                <ul className="list-box">
                    <h4>Health & safety</h4>
                  <li>Carbon monoxide alarm</li>
                  <li>Smoke alarm</li>
                </ul>
                <ul className="list-box">
                    <h4>Cancellation Policy</h4>
                  <li>Get Away's social distancing and other COVID-19-related
                  guidelines apply</li>
                    <h5><a href="http://www.google.com">More Details ></a></h5>
                </ul>
                </div>
            </div>
    )
}

export default Rules
