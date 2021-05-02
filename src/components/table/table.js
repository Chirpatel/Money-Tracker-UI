import {
    React,
    useState,
    useEffect
} from 'react';
import {
    DataGrid
} from '@material-ui/data-grid';
import getDataApi from '../../api/data';
const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 70
    },
    {
        field: 'coinName',
        headerName: 'Coin',
        width: 100
    },
    // {
    //     field: 'date',
    //     headerName: 'Date',
    //     width: 130
    // },
    {
        field: 'name',
        headerName: 'Coin Name',
        width: 130
    },
    {
        field: 'amount',
        headerName: 'Amount',
        type: 'number',
        width: 90
    },
    {
        field: 'quantity',
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


function Table() {
    const [rows, setRows] = useState([]);
    const [names, setNames] = useState([]);
    useEffect(() => {
        const url = 'https://moneytracker.vercel.chir.in/data/crypto/'
        const getData = async () => {
            let namesList = []
            setRows((await getDataApi(url)).map((data, index) => {
                namesList.push(data.coinName.toLowerCase() + data.currency.toLowerCase());
                return {
                    id: index,
                    boughtPrice:data.amount/data.quantity,
                    ...data
                };
            }));
            setNames(namesList);
        }
        if (rows.length === 0)
            getData();
    }, [setRows, rows])


    useEffect(() => {
        const interval = setInterval(async () => {
            let url = 'https://moneytracker.vercel.chir.in/api/crypto/price?list='
            let prices = await getDataApi(url + names.map((data) => {
                return data + ""
            }))
            console.log(prices)
            setRows(rows.map((data) => {
                let price = prices[data.coinName.toLowerCase() + data.currency.toLowerCase()]
                let plr = price*data.quantity - data.amount
                let pla =plr/price*100;
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
        }, 2000);

        return () => clearInterval(interval);
    }, [rows, names])


    return ( 
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={50} checkboxSelection />
        </div>
    )
}

export default Table