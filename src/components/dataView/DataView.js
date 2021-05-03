import {React,useState, useEffect} from 'react'
import './dataView.css'
function DataView(props) {
    const [columns, setColumns] = useState("");
    const [range, setRange] = useState({sheetname:"",cell1:"",cell2:""});
    const handleRangeChange= (event) => {
        //console.log(event.target.name,event.target.value)
        if(event.target.name==="sheetname")
            setRange({...range,sheetname:event.target.value})
        else if(event.target.name==="cell1")
            setRange({...range,cell1:event.target.value})
        else if(event.target.name==="cell2")
            setRange({...range,cell2:event.target.value})
        else
            setColumns(event.target.value)
    }
    const call = () =>{
        
        let url =`https://moneytracker.vercel.chir.in/data/sheets?range=${range.sheetname}!${range.cell1}:${range.cell2}&columns=${columns}`
        props.dataChange(url);
    }
    useEffect(() => {
        if(props.data.length===0){
            setRange({sheetname:"Crypto",cell1:"A17",cell2:"J80"})
            setColumns("Type,Month,Name,Amount,Quantity,Bougt/Sold")
            call()
        }
    }, [props])

    const handleRefresh = () =>{
        console.log("API Called",range,columns)
        call();
    }
    return (
        <div className="dataView">
            <div className="dataView-params">
                <span>Range: {range.sheetname}!{range.cell1}:{range.cell2}</span>
                <input type="text" name="sheetname" value={range.sheetname} onChange={(e)=>{handleRangeChange(e)}}/>
                <input type="text" name="cell1" value={range.cell1} onChange={(e)=>{handleRangeChange(e)}}/>
                <input type="text" name="cell2" value={range.cell2} onChange={(e)=>{handleRangeChange(e)}}/>
                <input type="text" name="columns" value={columns} onChange={(e)=>{handleRangeChange(e)}}/>
                <button onClick={()=>{handleRefresh()}}>Refresh</button>                
            </div>
            <div className="dataView-table">
                <table>
                    <thead>
                        <tr>
                            {columns &&
                                columns.split(",").map((column)=>{return <th>{column.toUpperCase()}</th>})
                            }
                        </tr>
                    </thead>
                    <tbody>
                    {props.data &&
                        props.data.map((data,key)=>{
                            return <tr key={key}>
                                {
                                    columns.split(",").map((column,key)=>{return <td key={key}>{data[column]}</td>})
                                }
                                </tr>
                        })

                    }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default DataView
