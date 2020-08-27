import React, {Component} from 'react';
import './Style.css';
import './card.css';
import './Date.css';
import FullWidthTabs from './CenterTab';
import CustomizedTabs from './Tab';
import CheckBox from './CheckBox';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
// import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme) => ({
        
    menuButton: {
      marginRight: theme.spacing(2),
    },
  }));
class Home extends Component{
    
    
    render(){
        return(
        // <div>
        //     <p>User Id : {this.props.params.id}</p>
        //     <p>Name    : {this.props.params.name}</p>
        //     </div>
        <div>
        {/* <div className="split1 left1"> <FullWidthTabs message = {this.props.params.id}/> </div>
        <div className="split1 center1"style={{overflowX:"hidden", overflowY:"scroll"}} >
        <div className="split1 style">
                <CheckBox  message = {this.props.params.id}/>
                </div>
                </div> */}
        <div className="split1 right1"> 
        <div  className="header">
        <div className="subsplitleft">
          <IconButton edge="false" color="inherit" aria-label="menu" style={{margin:"0px auto"}} >
            <SettingsIcon />
          </IconButton>
        </div>
         {this.props.params.name}  
         <div className="subsplitright">
         <IconButton edge="start" color="inherit" aria-label="menu" >
         <ExitToAppIcon />
          </IconButton>
        </div>
        
        </div> 
         
        <CustomizedTabs  message = {this.props.params.id}/>
        
       </div>  
        
        
        </div>  
        )
    }
}
export default Home;


