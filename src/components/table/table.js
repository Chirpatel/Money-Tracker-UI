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
        field: 'Coin',
        headerName: 'Coin',
        width: 100
    },
    {
        field: 'Amount',
        headerName: 'Total Amount',
        type: 'number',
        width: 120
    },
    {
        field: 'Quantity',
        headerName: 'Total Quantity',
        type: 'number',
        width: 120
    },
    {
        field: 'soldAmount',
        headerName: 'Sold Amount',
        type: 'number',
        width: 120
    },
    {
        field: 'soldQuantity',
        headerName: 'Sold Quantity',
        type: 'number',
        width: 120
    },
    {
        field: 'leftQuantity',
        headerName: 'Left Quantity',
        type: 'number',
        width: 120
    },
    {
        field: 'Currency',
        headerName: 'Currency',
        width: 90
    },
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
        //console.log(props.data)
        const getData = async () => {
            //console.log(props.changed)
            props.dataChange()
            let newData = {};
            let namesList = []
            let currency={USDT:0,WRX:0,INR:0}
            props.data.data.map((data, index) => {
                let name = data.Coin+data.Currency;
                if (data.Coin !== "Tax") {
                    if (newData[name] !== undefined ) {
                        //console.log(newData, data, data.Amount)
                        if (data["TransactionType"] === "Sold") {
                            newData[name].soldAmount += parseFloat(data.Amount)
                            newData[name].soldQuantity += parseFloat(data.Quantity)
                        } else {
                            newData[name].Amount += parseFloat(data.Amount)
                            newData[name].Quantity += parseFloat(data.Quantity)
                        }
                    } else {
                        if(data["TransactionType"] === "Sold"){
                            newData[name] = {
                                ...data,
                                Amount: 0,
                                Quantity: 0,
                                soldAmount:parseFloat(data.Amount),
                                soldQuantity:parseFloat(data.Quantity)
                            };
                        }else{
                            newData[name] = {
                                ...data,
                                Amount: parseFloat(data.Amount),
                                Quantity: parseFloat(data.Quantity),
                                soldAmount:0,
                                soldQuantity:0
                            };
                        }
                        namesList.push(name.toLowerCase());
                    }
                    if(data.TransactionType==="Sold"){
                        currency[data.Currency]+=parseFloat(data.Amount)
                    }else{
                        currency[data.Currency]-=parseFloat(data.Amount);
                    }
                    //console.log(newData)
                }
                return null;
            })
            console.log(currency);
            setRows(Object.keys(newData).map((key, index) => {
                return {
                    ...newData[key],
                    id: index,
                    boughtPrice: parseFloat(newData[key].Amount) / parseFloat(newData[key].Quantity),
                    leftQuantity: newData[key].Quantity-newData[key].soldQuantity
                };
            }))
            setNames(namesList.filter(function () { return true }));
            //console.log(newData);
            
        }
        if (props.data.changed && props.data.data.length > 0)
            getData();
    }, [setRows, rows, props])


    useEffect(() => {
        const interval = setInterval(async () => {
            if(names.length>0){
                let url = 'https://moneytracker.vercel.chir.in/api/crypto/price?list='
                let prices = await getDataApi(url + names.map((data) => {
                    return data + ""
                }))
                //console.log(prices)
                //console.log()
                setRows(rows.map((data) => {

                    let price = prices[data.Coin.toLowerCase() + data.Currency.toLowerCase()]
                    let plr = data.soldAmount-data.Amount
                    let pla = plr / data.Amount * 100;
                    if(data.leftQuantity!==0)
                    {
                        plr = (price * (data.Quantity-data.soldQuantity)) - (data.Amount - data.soldAmount)
                        pla = plr / (data.Amount-data.soldAmount) * 100;
                    }
                    let status = "Profit"
                    if (plr < 0) {
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
            }
        }, 10000);

        return () => clearInterval(interval);
    }, [rows, names, props])


    return ( 
        <div style = {{height: 400,width: '100%'}} >
            <DataGrid sortModel={[
                {
                    field: 'leftQuantity',
                    sort: 'desc',
                },
                    {
                        field: 'plr',
                        sort: 'desc',
                    },
                    
                ]} rows = {rows}columns = {columns} pageSize = {50} checkboxSelection />
        </div>
    )
}

export default Table