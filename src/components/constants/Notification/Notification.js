import {React, useState,useEffect} from 'react';
import ReactNotifications from 'react-browser-notifications';

function Notification(props) {
    const[variable,setVariable] = useState();
//    const showNotifications = () => {
//     if(variable.supported()) variable.show();
//   }
  const handleClick = (event) =>{
    this.n.close(event.target.tag);
  }
  useEffect(() => {
      if (variable && props.notification){
        if(variable.supported()){
            variable.show()
            props.handleShow(props.id)
        };
      }
  }, [props,variable])
    return (
        <div>

            <ReactNotifications
                onRef={ref =>{ setVariable(ref)}} // Required
                title={props.coin} // Required
                body={props.body}
                icon="icon.png"
                tag="abcdef"
                timeout="5000"
                onClick={event => handleClick(event)}
            />
        </div>
    )
}

export default Notification