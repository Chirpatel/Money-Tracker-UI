import {React, useState, useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import getDataApi from '../../api/data';
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'coinName', headerName: 'Coin', width: 100 },
  { field: 'date', headerName: 'Date', width: 130 },
  { field: 'name', headerName: 'Coin Name', width: 130 },
  {field: 'amount', headerName: 'Amount', type: 'number', width: 90},
  {field: 'quantity', headerName: 'Quantity', type: 'number', width: 90},
  { field: 'transactionType', headerName: 'Transaction Type', width: 130 },
];

// let rows =[]

// const getData = async () =>{rows= await getDataApi(); console.log(rows)}

function Table() {
    const [rows, setRows] = useState([]);
    useEffect(() => {
    
        const getData= async () => {
            setRows((await getDataApi()).map((data,index)=>{return {id:index,...data}}));
            console.log(rows);
        }
        if(rows.length===0)
        getData();
    }, [setRows,rows])
    return (
        <div style={{ height: 4000, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={50} checkboxSelection />
        </div>
    )
}

export default Table
