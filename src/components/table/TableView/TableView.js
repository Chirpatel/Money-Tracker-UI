import {React,useState, useEffect}from 'react'
import TableViewRow from './TableViewRow/TableViewRow';

import './TableView.css';

function TableView({columns,rows}) {
    const [rowData,setRowData] = useState([]);
    useEffect(() => {
        let sortField = "";
        let sortCondition="asc";
        let hideField="";
        let hideCondition;
        if(sortField===""){
            columns.map((column)=>{
                if(column.sorting){
                    sortCondition=column.sorting;
                    sortField=column.field;
                }
                if(column.hide!==undefined){
                    hideField=column.field;
                    hideCondition=column.hide;
                }
                return null;
            })
        }
        
        return () => {
            if(sortCondition==="asc"){
                setRowData(rows.filter( row => row[hideField]!==hideCondition).sort((a,b)=>{return a[sortField] - b[sortField]}))
            }
            else{
                setRowData(rows.filter( row => row[hideField]!==hideCondition).sort((a,b)=>{return b[sortField] - a[sortField]}))
            }
        }
    }, [rows,columns])
    return (
        <div className="tableView">
            {columns &&
                <table>
                    <thead>
                        <tr>
                            <th style={{width:"10px"}}></th>
                            {columns.map((column,key)=>{return <th style={{width:`${column.width}px`}} key={key}>{column.headerName}</th>})}
                        </tr>
                    </thead>
                    {rowData &&
                        <tbody>
                            {rowData.map((row,rowKey)=>{
                                return <TableViewRow key={rowKey+"-TableViewRow"} row={row} columns={columns} rowKey={rowKey} />
                            })}
                        </tbody>
                    }
                </table>
            }
        </div>
    )
}

export default TableView
