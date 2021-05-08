import React from 'react'

function Loader({height,width}) {
    return (
        <div style={{height:`calc(100% - ${height?height:0}px)`,width:`calc(100% - ${width?width:0}px)`,position:"relative"}}>
            <svg style={{position:"absolute",top:"calc(50% - 25px)",left:"calc(50% - 25px)"}} xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                <path fill="#005498" d="M25,5A20.14,20.14,0,0,1,45,22.88a2.51,2.51,0,0,0,2.49,2.26h0A2.52,2.52,0,0,0,50,22.33a25.14,25.14,0,0,0-50,0,2.52,2.52,0,0,0,2.5,2.81h0A2.51,2.51,0,0,0,5,22.88,20.14,20.14,0,0,1,25,5Z">
                    <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.5s" repeatCount="indefinite" />
                </path>
            </svg>
        </div>
    )
}

export default Loader
