import {React, useState} from 'react'

function TableViewRow({columns,row,rowKey}) {
    const [expand, setExpand] = useState(false);
    const customClass = (data)=>{
        let customClass={}
        let field=""
        if(customClass==={}|| field===""){
            columns.map((column)=>{
                if(column.customCss){
                    field=column.field;
                    customClass=column.customStyle;
                }
                return null;
            })
        }
        if(customClass!=={} && field!=="")
        return customClass[data[field]];
    }
    const handleClick= () =>{
        setExpand(!expand)
    }
    return (
        <>
            <tr className={customClass(row)} key={rowKey}>
                <td onClick={()=>{handleClick()}} style={{width:"10px",cursor:"pointer"}}>{expand?"-":"+"}</td>
                {columns.map((column,key)=>{return <td style={{width:`${column.width}px`}} key={key}>{(column.type==="number"?`${Number(row[column.field]).toFixed(4)}`:row[column.field])}</td>})}
            </tr>
            {expand &&
                <tr className="expandable" >
                    <td key={rowKey+"-expand"} colSpan={Object.keys(columns).length + 1}>
                        {row.data &&
                            <table>
                                {Object.keys(row.data[0]) &&
                                    <thead>
                                        <tr>
                                            {Object.keys(row.data[0]).map((col,key)=>{return <th key={key}>{col}</th>})}
                                        </tr>
                                    </thead>
                                }  
                                {row.data &&
                                    <tbody>
                                        {row.data.map((data,key)=>{
                                                return (
                                                    <tr className={customClass(data)} key={key}> 
                                                        {Object.keys(data).map((col,key)=>{return <td key={key}>{data[col]}</td>})}
                                                    </tr>
                                                );
                                            })

                                        }
                                    </tbody>

                                }
                            </table>
                        }
                    </td>
                </tr>
            }
        </>
    )
}

export default TableViewRow
