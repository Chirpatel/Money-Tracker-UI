import {React,useState,useEffect} from 'react'
import Table from './table/Table'
import DataView from './dataView/DataView'
import getApi from './api/data'
import Loader from './Loader/Loader'
import Header from './constants/Header/Header'
function Index() {
    const [data, setData] = useState({data:[],changed:false});
    const [loading, setLoading] = useState(true);
    const [table, setTable] = useState([]);
    const [columns, setColumns] = useState([]);
    const handleDataChange = async (url)=>{  
        setData({data:await getApi(url),changed:true});
    }
    const handleChanged = async ()=>{
        setData({...data,changed:false});
    }
    const page= "Crypto";
    useEffect(() => {
        const getPage = async () => {
            console.log("Called")
            let url = `https://moneytracker.vercel.chir.in/data/page/get?page=${page}`
            let data = await getApi(url);
            setTable(data.data.table)
            setColumns(data.data.columns)
            setLoading(false);
            console.log(data.data.columns)
        }
        getPage()
    }, [page])
    return (
        <>
            {loading &&
                <div style={{height: "calc(100vh - 25px)"}}>
                    <Loader/>
                </div>
            }
            {!loading && table&&
                <>
                    <Header text={page} fontSize={25} />
                    <Table data={data} columns={columns[0]} dataChange={handleChanged}/>
                    <DataView data={data.data} table={table[0]} dataChange={handleDataChange}/> 
                </>
            }

        </>
    )
}

export default Index
