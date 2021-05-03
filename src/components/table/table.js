import {
    React,
    useState,
    useEffect
} from 'react';
import {
    DataGrid
} from '@material-ui/data-grid';
import getDataApi from '../api/data';
const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 70
    },
    {
        field: 'Type',
        headerName: 'Coin',
        width: 100
    },
    // {
    //     field: 'date',
    //     headerName: 'Date',
    //     width: 130
    // },
    // {
    //     field: 'name',
    //     headerName: 'Coin Name',
    //     width: 130
    // },
    {
        field: 'Amount',
        headerName: 'Amount',
        type: 'number',
        width: 90
    },
    {
        field: 'Quantity',
        headerName: 'Quantity',
        type: 'number',
        width: 90
    },
    {
        field: 'currency',
        headerName: 'Currency',
        width: 90
    },
    // {
    //     field: 'transactionType',
    //     headerName: 'Transaction Type',
    //     width: 130
    // },
    {
        field: 'price',
        headerName: 'Current Price',
        type: 'number',
        width: 160
    },
    {
        field: 'boughtPrice',
        headerName: 'Bought Price',
        type: 'number',
        width: 160
    },
    {
        field: 'plr',
        headerName: 'Profit/Loss',
        type: 'number',
        width: 160
    },
    {
        field: 'pla',
        headerName: 'Profit/Loss (%)',
        type: 'number',
        width: 160
    },
    {
        field: 'status',
        headerName: 'Status',
        type: 'String',
        width: 160
    },
];


function Table(props) {
    const [rows, setRows] = useState([]);
    const [names, setNames] = useState([]);
    useEffect(() => {
        console.log(props.data)
        const getData = async ()=>{
            let newData = {};
            let namesList = []
            props.data.data.map((data,index)=>{
                if(data.Type!=="Tax"){
                    if(newData[data.Type]!==undefined){
                        console.log(newData, data,data.Amount)
                        if(data["Bougt/Sold"]==="Sold"){
                            newData[data.Type].Amount-=parseFloat(data.Amount)
                            newData[data.Type].Quantity-=parseFloat(data.Quantity)
                        }else{
                            newData[data.Type].Amount+=parseFloat(data.Amount)
                            newData[data.Type].Quantity+=parseFloat(data.Quantity)
                        }
                    }else{
                        newData[data.Type]={...data,Amount: parseFloat(data.Amount),
                            Quantity: parseFloat(data.Quantity)};
                        namesList.push(data.Type.toLowerCase() + "inr");

                    }
                    //console.log(newData)
                }
                    
                    // return {
                    //     ...data,
                    //     Amount: parseFloat(data.Amount),
                    //     Quantity: parseFloat(data.Quantity),
                    //     id: index,
                    //     boughtPrice:parseFloat(data.Amount)/parseFloat(data.Quantity)
                    // }
            })
            setRows(Object.keys(newData).map((key,index)=>{
                return {...newData[key], id: index, boughtPrice:parseFloat(newData[key].Amount)/parseFloat(newData[key].Quantity)};
            }))
            setNames(namesList);
            console.log(newData);
            props.dataChange()
        }
        if (props.data.changed && props.data.data.length>0)
            getData();
    }, [setRows, rows,props])


    useEffect(() => {
        const interval = setInterval(async () => {
            let url = 'https://moneytracker.vercel.chir.in/api/crypto/price?list='
            let prices = await getDataApi(url + names.map((data) => {
                return data + ""
            }))
            //console.log(prices)
            //console.log()
            setRows(rows.map((data) => {
                
                let price = prices[data.Type.toLowerCase() + 'inr']
                let plr = price*data.Quantity - data.Amount
                let pla =plr/data.Amount*100;
                let status = "Profit"
                if(plr<0){
                    status = "Loss"
                }
                return {
                    ...data,
                    price: price,
                    plr: plr,
                    pla: pla,
                    status: status
                }
            }))
        }, 10000);

        return () => clearInterval(interval);
    }, [rows, names,props])


    return ( 
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={50} checkboxSelection />
        </div>
    )
}

export default Table