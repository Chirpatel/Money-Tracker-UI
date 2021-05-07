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
    const call = async () =>{
        
        let url =`https://moneytracker.vercel.chir.in/data/sheets?range=${range.sheetname}!${range.cell1}:${range.cell2}&columns=${columns}&sheetId=cryptoTable1_cryptoTable1`
        await props.dataChange(url);
    }
    useEffect(() => {
        if (columns.length === 0) {
            //console.log(props.data)

            const temp = async () => {
                await setRange({ sheetname: "Crypto", cell1: "A2", cell2: "J" });
                await setColumns("Coin,Date,Quantity,Amount,Currency,Tax,TaxCurrency,TransactionType,Remark"); 
                //let url = `https://moneytracker.vercel.chir.in/data/sheets?range=${range.sheetname}!${range.cell1}:${range.cell2}&columns=${columns}`
                let url ="https://moneytracker.vercel.chir.in/data/sheets?range=Crypto!A2:J&columns=Type,Month,Name,Amount,Quantity,Bougt/Sold&sheetId=cryptoTable1_cryptoTable1"
                await props.dataChange(url);
            };
            temp();
        }
    }, [props, range, columns])

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
            {columns &&

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
    )
}

export default DataView
