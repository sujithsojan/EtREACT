import React from "react";
import axios from 'axios';
import {TextField,Button} from '@material-ui/core/';
import './Style.css';
import { withStyles } from "@material-ui/core/styles";
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Autocomplete from '@material-ui/lab/Autocomplete';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';

//Getting todays in format
var date = new Date();
var moment = require('moment');
var dateIn = moment(date);
var formatedDate=dateIn.format("YYYY-MM-DD");


//Adding js styles
const styles = theme => (
    {
    container: {
        display: 'flex',    
        flexWrap: 'wrap',
    },
    datepickerx:{
        width: 150,
        underline: {
            "&&&:before": {
            color: "white"
            },
            "&&:after": {
            color: "white"
            }
            },
            '&& .MuiInput-root:hover::before': {
                borderColor: 'white',
            },
            '& .MuiInput-input':{ color: "white"},
            paddingLeft: 80,
            color: "white",
            textEmphasisColor: "white",
            '& .MuiInput-underline:before': {
            borderBottomColor: "white",
            '& .MuiInput-underline:after': {
                borderBottomColor: 'white',
            },
            '& .MuiInput-underline:before': {
                borderBottomColor: 'white',
            },
            multilineColor:{
                color:'white'
            },
            '& label.Mui-focused': {
                color: 'white',
            },
            '& label': {
                color: 'white',
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: 'white',
            },
            '& .MuiInput-underline:before': {
                borderBottomColor: 'white',
            },
            '&:hover fieldset': {
                borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'white',
            },
            
            
            },
        },
    Button:{
    
        background: 'grey',
        border: 0,
        borderRadius: 3,
        color: "white",
        width:400,
        marginTop: 50,
        backgroundColor: 'black',
        borderColor: '#007bff',
        borderRadius: 10,
        '&:hover': {
        backgroundColor: 'black',
        borderColor: '#0062cc',
        },
        '&:active': {
        boxShadow: 'none',
        backgroundColor: 'black',
        borderColor: '#005cbf',
        
        },
        '&:focus': {
        boxShadow: 'black',
        },
        
        
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 400,
        paddingTop: 10,
        marginTop: 20,
        color: "white",
        '& .MuiInput-input':{ color: "white"},
        multilineColor:{
        color:'white'
        },
        '& label.Mui-focused': {
        color: 'white',
        },
        '& label': {
        color: 'white',
        },
        '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
        },
        '& .MuiInput-underline:before': {
        borderBottomColor: 'white',
        },
        
        '&:hover fieldset': {
        borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
        borderColor: 'white',
        },
        '&& .MuiInput-root:hover::before': {
        borderColor: 'white',
        } 
        },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    });
    

    //Included with material ui code for Numberbox
    function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
    
      return (
        <NumberFormat
          {...other}
          getInputRef={inputRef}
          onValueChange={values => {
          onChange({
            target: {
              value: values.value,
            },
          });
          }}
          thousandSeparator
          prefix="₹"
        />
      );
    }
    
    NumberFormatCustom.propTypes = {
      inputRef: PropTypes.func.isRequired,
      onChange: PropTypes.func.isRequired,
    };

  // class starts here
  class InsertIncome extends React.Component {
    // constructers
    constructor(props){
    super(props);
    this.state = {
    item:'',
    amount:'',
    category:'',
    selex:'',
    selectedOption: '',
    ProductData: [] ,
    open: false,
  }
}

  //Following function will be called by default on page load
  
   componentDidMount() {  
    axios.get('http://localhost:8081/tracker/register/liscategoryincome')
    .then(response => {  
            console.log("____________",response.data);  
            this.setState({  
                    ProductData: response.data  
            });  
    });  
}     

  //functions for various Onchange events

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange1 = event => {
    this.setState({ date: event.target.value });
    console.log(this.state.date);
  }

  handleChange2 = event => {
    this.setState({ item: event.target.value });
    console.log(this.state.item);
    console.log("----------------",this.state.ProductData);
  }

  handleChange3 = event => {
    this.setState({ amount: event.target.value });
    console.log(this.state.amount);
    
  }

  handleChange4 = event => {
    this.setState({ category: event.target.value });
    console.log(this.state.category);

  }

  handleOptionSelected =  (event, values) => {
    this.setState({selex: values}, () => {
      console.log("0000000000000",this.state.selex);
    });
  }

  //Function to handle submit event
  handleSubmit = event => {
    event.preventDefault();
    console.log("dfdf");

    axios.post(`http://localhost:8081/tracker/register/addincome?USER_ID=${this.props.message}&ITEM=${this.state.item}&CATEGORY_ID=${this.state.selex.value}&AMOUNT=${this.state.amount}&TRANSACTION_DATE=${this.state.date}`)    .then(res => {
      console.log("res="+res);
      this.setState({ open: true,amount:'',item:'',selex:'',date:formatedDate });    })
    this.setState({ open: true});


  }

  render() {

    const { classes } = this.props;

    //Mapping result into label and value
    let options = this.state.ProductData.map(function (cat) {
      return { value: cat.ID, label: cat.CATEGORY_NAME };
    })
    console.log("xxxxxxxx",options);
    
    return (
      
      <div class="textdiv">
        {/* form starts here */}
        <form onSubmit={this.handleSubmit} >
       
            {/* Datepicker */}
            <label className="labelclass"> 
            Date            
                    <TextField
                    onChange={this.handleChange1}
                    name="date" 
                    type="date"
                    value={this.state.date}
                    className={classes.datepickerx}
                    required                    
                    />
                    <CalendarTodayIcon style={{ fontSize: 25, paddingLeft:100 }}  />
            </label>

            {/* Item Field */}

            <TextField 
              required 
              className={classes.textField} 
              label="Item" 
              name="item" 
              value={this.state.item}
              onChange={this.handleChange2}/>

            {/* Amount field */}
            <TextField
              className={classes.textField}
              label="Amount"
              required
              name="amount"
              value={this.state.amount}
              onChange={this.handleChange3}
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
        />
            
            {/* <TextField required pattern="[0-9]*" className={classes.textField} label="Amount" name="amount" onChange={this.handleChange3}/><div/> */}
            
            {/* Material UI autocomplete for category */}

            <Autocomplete
                id="clear-on-escape"
                clearOnEscape
                required
                className={classes.textField}
                options={options}
                value={this.state.selex}
                required
                getOptionLabel={option => option.label}       
                onOptionSelected={this.handleOptionSelected}
                onChange={this.handleOptionSelected}
                renderInput={(params) => (
                <TextField {...params} label="Category" margin="normal" />
                )}
            />        

            {/* Submit button */}

            <div> 
             <Button className={classes.Button}  variant="contained" disableElevation type="submit">
                  ADD INCOME
             </Button>
              <Snackbar
                  open={this.state.open}
                  onClose={this.handleClose}
                  TransitionComponent={Fade}
                  autoHideDuration={1000}
                  message={<span  id="message-id">Income Insertion Successfull</span>}
            /> 
           </div>

          
        </form>
      </div>
    )
  }
}
export default withStyles(styles)(InsertIncome);
