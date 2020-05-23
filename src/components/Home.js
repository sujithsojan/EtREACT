import React, {Component} from 'react';
import './Style.css';
import './card.css';
import FullWidthTabs from './CenterTab';
import CustomizedTabs from './Tab';
import CheckBox from './CheckBox';

class Home extends Component{
    
    
    render(){
        return(
        // <div>
        //     <p>User Id : {this.props.params.id}</p>
        //     <p>Name    : {this.props.params.name}</p>
        //     </div>
        <div>
        <div className="split1 left1"> <FullWidthTabs message = {this.props.params.id}/> </div>
        <div className="split1 center1"style={{overflowX:"hidden", overflowY:"scroll"}} >
        <div className="split1 style">
                <CheckBox  message = {this.props.params.id}/>
                </div>
                </div>
        <div className="split1 right1"> 
        <div  className="header">
        
         {this.props.params.name}  
        
         </div>
        <CustomizedTabs  message = {this.props.params.id}/>
        </div>  
    </div>  
        )
    }
}
export default Home;