import {React,useState,useEffect} from 'react'
import Table from './table/Table'
import DataView from './dataView/DataView'
import getApi from './api/data'
import Loader from './Loader/Loader'
function Index() {
    const [data, setData] = useState({data:[],changed:false});
    const [loading, setLoading] = useState(true);
    const [table, setTable] = useState([]);
    const handleDataChange = async (url)=>{  
        setData({data:await getApi(url),changed:true});
    }
    const handleChanged = async ()=>{
        setData({...data,changed:false});
    }
    const page= "Crypto";
    useEffect(() => {
        const getPage = async () => {
            //console.log("Called")
            let url = `https://moneytracker.vercel.chir.in/data/page/get?page=${page}`
            setTable((await getApi(url)).data.table)
            setLoading(false);
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
                    <Table data={data} heading={page} dataChange={handleChanged}/>
                    <DataView data={data.data} table={table[0]} dataChange={handleDataChange}/> 
                </>
            }

        </>
    )
}

export default Index
