import React from 'react'

function Header({text,fontSize}) {
    return (
        <div style={{fontSize:`${fontSize?fontSize:20}px`,fontWeight: "bold",color: "#005498",margin:"10px"}}>
            {(text?text:"Heading")}
        </div>
    )
}

export default Header
