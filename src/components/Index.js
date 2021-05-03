import {React,useState} from 'react'
import Table from './table/Table'
import DataView from './dataView/DataView'
import getDataApi from './api/data'
function Index() {
    const [data, setData] = useState({data:[],changed:false});
    const handleDataChange = async (url)=>{  
        setData({data:await getDataApi(url),changed:true});
    }
    const handleChanged = async ()=>{
        setData({...data,changed:false});
    }
    return (
        <>
            <Table data={data} dataChange={handleChanged}/>
            <DataView data={data.data} dataChange={handleDataChange}/>
        </>
    )
}

export default Index
