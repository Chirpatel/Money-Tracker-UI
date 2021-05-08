import {React,useState, useEffect} from 'react'
import './dataView.css'
import Loader from '../Loader/Loader'
function DataView(props) {
    const [columns, setColumns] = useState("");
    const [range, setRange] = useState({sheetname:"",cell1:"",cell2:""});
    const [loading, setLoading] = useState(true)
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
    const call = async () =>{
        let url =`https://moneytracker.vercel.chir.in/data/sheets?range=${range.sheetname}!${range.cell1}:${range.cell2}&columns=${columns}&sheetId=${props.table.sheetId}`
        await props.dataChange(url);
        setLoading(false);
    }
    useEffect(() => {
        //console.log(props,columns)
        if (columns.length === 0) {
            //console.log(props.data)

            const temp = async () => {
                await setRange({ sheetname: props.table.range.sheet, cell1:props.table.range.col1, cell2: props.table.range.col2 });
                await setColumns(props.table.columns); 
                //let url = `https://moneytracker.vercel.chir.in/data/sheets?range=${range.sheetname}!${range.cell1}:${range.cell2}&columns=${columns}`
                let url =`https://moneytracker.vercel.chir.in/data/sheets?range=${props.table.range.sheet}!${props.table.range.col1}:${props.table.range.col2}&columns=${props.table.columns}&sheetId=${props.table.sheetId}`
                await props.dataChange(url);
                setLoading(false);
            };
            temp();
        }
    }, [props, range, columns])

    const handleRefresh = () =>{
        setLoading(true);
        console.log("API Called",range,columns)
        call();
    }
    return (
        <>
        
        <div className="dataView">
            <div className="dataView-params">
                <div className="tableName">{props.table.tableName}</div>
                <span>Range: {range.sheetname}!{range.cell1}:{range.cell2}</span>
                <input type="text" name="sheetname" value={range.sheetname} onChange={(e)=>{handleRangeChange(e)}}/>
                <input type="text" name="cell1" value={range.cell1} onChange={(e)=>{handleRangeChange(e)}}/>
                <input type="text" name="cell2" value={range.cell2} onChange={(e)=>{handleRangeChange(e)}}/>
                <input type="text" name="columns" value={columns} onChange={(e)=>{handleRangeChange(e)}}/>
                <button onClick={()=>{handleRefresh()}}>Refresh</button>                
            </div>
            {loading &&
                <Loader height={55} width={0}/>
            }
            {!loading && columns &&

                <div className="dataView-table">
                <table>
                    <thead>
                        <tr>
                            {columns.split(",").map((column,key)=>{return <th key={key}>{column.toUpperCase()}</th>})}
                        </tr>
                    </thead>
                    
                    {props.data &&
                        <tbody>
                            {props.data.map((data,key)=>{
                                return <tr key={key}>
                                    {
                                        columns.split(",").map((column,key)=>{return <td key={key}>{data[column]}</td>})
                                    }
                                    </tr>
                            })}
                        </tbody>
                    }
                    
                </table>

                </div>
            }
            
            

        </div>
        </>
    )
}

export default DataView
