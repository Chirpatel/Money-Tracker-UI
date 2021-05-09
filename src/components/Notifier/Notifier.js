import {React,useState,useEffect} from 'react'
import './Notifier.css'
import Header from '../constants/Header/Header'
import Notification from '../constants/Notification/Notification'
function Notifier(props) {
    const [notification,setNotification] = useState([]);
    const [notficationDisplayed, setNotificationDispalyed] = useState([]);
    const [notifier, setNotifier] = useState({})
    const [viewNotifier, setViewNotifier] = useState(false);
    const [addNotification, setAddNotification] = useState(false);
    const [data,setData]= useState({coin:"",condition:"==",value:0})
    useEffect(() => {
        //console.log("Price Changed")
        const switchCase = (var1,var2,cond)=>{
            switch (cond) {
                case "==":
                    return var1 === var2;
                case ">=":
                    return var1 >= var2;
                case "<=":
                    return var1 <= var2;
                case ">":
                    return var1 > var2;
                case "<":
                    return var1 < var2;
                default:
                    return false;
            }
        }
        const check = ()=>{
            
            Object.keys(notifier).map((key)=>{
                let notify = notifier[key];
                if (switchCase(props.price[notify.coin],notify.value,notify.condition)){
                    //console.log(`The Coin ${notify.coin} Condtion ${notify.condition} ${notify.value} is valid`)
                    setNotification((n) => {
                        //console.log(n)
                        let data = n.filter(data=>data.id===key)
                        //console.log(data)
                        if(data.length>0){
                            //console.log(data[0].id,new Date() - new Date(data[0].time))
                            if(new Date() - data[0].time > 1000*60*2){
                                
                                //console.log(`The ${notify.coin} ${notify.condition} ${notify.value}|| Current Value: ${props.price[notify.coin]}`)
                                return [...n.filter(data=>data.id!==key), { id: `${key}`, body: `${notify.coin.toUpperCase()} ${notify.condition} ${notify.value} || Current Value: ${props.price[notify.coin]}`, coin: notify.coin.toUpperCase(),time:new Date()}]
                            }
                            else{
                                return n
                            }
                        }else{
                            //console.log(`The ${notify.coin} ${notify.condition} ${notify.value}|| Current Value: ${props.price[notify.coin]}`)
                            return [...n, { id: `${key}`, body: `${notify.coin.toUpperCase()} ${notify.condition} ${notify.value} || Current Value: ${props.price[notify.coin]}`, coin: notify.coin.toUpperCase(),time:new Date()}]
                        }
                        
                    })
                }
                return null;
            })
            //console.log(notifier);
            //console.log(notification)
        }
        if(Object.keys(props.price).length>0 && Object.keys(notifier).length>0)
            check()
        //console.log(props.price)
    }, [props.price,notifier])
    const addNotifier = () =>{
        //console.log(props.price)
        setAddNotification(true);
    }
    const closeNotifier = () =>{
        setAddNotification(false);
    }
    const submitNotifier = () =>{
        let temp={};
        temp[Object.keys(notifier).length+1]=data;
        setAddNotification(false);
        setNotifier({...notifier,...temp})
        //console.log(data);
        setData({coin:"",condition:"==",value:0});
        
    }
    const addNotficationDisplayed = (id) =>{
        setNotificationDispalyed([...notficationDisplayed,id])
    }
    const setViewNotify = () => {
        setViewNotifier(true);
    }
    const closeViewNotifier = () => {
        setViewNotifier(false);
    }
    const removeNotifier = (id) => {
        setNotifier(Object.keys(notifier).reduce((notify, key) => {
            if (key !== id) {
                notify[key] = notifier[key]
            }
            return notify
        }, {}))
    }
    return (
        <>
            {notification.length>0 &&
                notification.map((notification,key)=>{
                    //console.log(notficationDisplayed)
                    if(!notficationDisplayed.includes(notification.id+notification.time)){
                        return <Notification key={key} notification ={true} body={notification.body} coin={notification.coin} id={notification.id+notification.time} handleShow={addNotficationDisplayed} />
                    }
                    return <Notification key={key} notification ={false} body={notification.body} coin={notification.coin} id={notification.id+notification.time} handleShow={addNotficationDisplayed} />
                })
            }
            <div className="notifier">
                <div className="notifier-add">
                    <button onClick={setViewNotify}>View Notifier</button>
                    <button onClick={addNotifier}>Add Notifier</button>
                </div>
                
                {props.price && addNotification && 
                    <div className="modal">
                        <div className="modal_content">
                            <span className="close" onClick={closeNotifier}>
                                &times;
                            </span>
                            <Header text={"Add Notifier"} fontSize={25} />
                            <div>
                                <label htmlFor="coin">Choose a coin:</label>
                                <select name="coin" id="coin" value={data.coin} onChange={(event)=>{setData({...data,coin:event.target.value})}}>
                                    {props.price && 
                                        Object.keys(props.price).map((coin,key)=>{
                                            if(data.coin==="")
                                            setData({...data,coin:coin})
                                            return <option key={key} value={coin}>{coin}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div>
                                <label htmlFor="condition">Condition:</label>
                                <select name="condition" id="condition" value={data.condition} onChange={(event)=>{setData({...data,condition:event.target.value})}}>
                                    {(["==",">=","<=",">","<"]).map((condition,key)=>{
                                            return <option key={key} value={condition}>{condition}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div>
                                <label htmlFor="value">Value:</label>
                                <input type="number" name="value" value={data.value} onChange={(event)=>{setData({...data,value:event.target.value})}}/>
                            </div>
                            <div>
                                <button onClick={submitNotifier}>Add</button>
                            </div>
                        </div>
                    </div>
                }
                {viewNotifier && 
                    <div className="modal">
                        <div className="modal_content">
                            <span className="close" onClick={closeViewNotifier}>
                                &times;
                            </span>
                            <Header text={"View Notifier"} fontSize={25} />
                            {notifier &&
                            <table className={"viewNotifier-table"}>
                                <thead>
                                    {Object.keys(notifier).length > 0 &&
                                        <tr>
                                            {Object.keys(notifier[Object.keys(notifier)[0]]).map((col,key)=>{
                                                return <th key={key}>{col}</th>
                                            })}
                                            <th>Remove</th>
                                        </tr>
                                    }
                                </thead>
                            {Object.keys(notifier).length > 0 &&
                                <tbody>
                                    {Object.keys(notifier).map((key) => {
                                        return(
                                            <tr key={key}> 
                                                {Object.keys(notifier[key]).map((col,k) => {
                                                    return <td key={k}> {notifier[key][col]}</td>
                                                })}
                                                <td><button onClick={() => {removeNotifier(key)}}>&times;</button></td>
                                            </tr>
                                        )})}
                                </tbody>
                            }
                            </table>

                            }
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Notifier
