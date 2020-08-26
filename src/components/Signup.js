import React, {Component} from 'react';
import '../styles/Login.css';
import Background from '../image/background.jpg';
import Input from '@material-ui/core/Input';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {browserHistory} from 'react-router';

var errormsg='';
class Signup extends Component {    
state = {
    name:'',
    emailId:'',
    password:'',
    confirmpassword:'',
    User : [],
    showError: false, 
    hidden: true
};
    validate = (state) =>{
        var nam = this.state.name;
        var uname = this.state.emailId;
        var pass =  this.state.password;
        var cpass = this.state.confirmpassword;
        
        //console.log(errormsg)
        
        if(uname===null || uname === '' || pass===null || pass==='')
            {
                errormsg="Username / Password missing!!!";
                this.setState((prevState, props) => {
                    return { showError: true }
                  })
            }
            else if (!nam.match("[A-Za-z\\s]{1,}[\\.]{0,1}[A-Za-z\\s]{0,}$")){
                errormsg='Name is invalid';
                this.setState((prevState, props) => {
                    return { showError: true }
                  })
                  }
        else if (!/\S+@\S+\.\S+/.test(uname)) {
            errormsg='Email address is invalid!!!';
            this.setState((prevState, props) => {
                return { showError: true }
              })
              }
        else if (!pass.match("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}")) {
            errormsg='Password must be strong !!!';
                this.setState((prevState, props) => {
                    return { showError: true }
                  })
                  }
        else if (pass != cpass) {
                errormsg='Passwords do not match ';
                this.setState((prevState, props) => {
                    return { showError: true }
                  })
                  }
        else {
             //browserHistory.push('/Home');
             var uname = this.state.emailId;
             var nam = this.state.name;
             var pass =  this.state.password;
            
            axios.post('http://localhost:8081/tracker/register',JSON.stringify({
            emailId:uname,
            name:nam,
            password:pass,
            }), {headers: { "Content-Type":"application/json"}})




           .then((response)=>{
            if  ((response.data)==1)
             {
            errormsg='Registration completed';
            this.setState((prevState, props) => {
                return { showError: true }
            })
            window.setTimeout(function(){
                browserHistory.push("/Login"); }, 3000);
            
        
        }
        else
        errormsg='registration unsuccessful';
            this.setState((prevState, props) => {
                return { showError: true }
              })
        console.log(response.data);

    }  
        )
            
        
    

            .catch(error => {
                errormsg='Error fetching and parsing data'+ error;
                this.setState((prevState, props) => {
                    return { showError: true }
                  })

              });           
        }
    }
   

    render(){
        const preventDefault = (event) => event.preventDefault();
        return (
            <div>
            <div className="split left">
                <img src={Background} alt="Background"/>
            </div>
            <div className="split right">
            <div>
                {this.state.showError && <div className="error-message">{errormsg}</div>}        
            </div>
                <div className='rightcontainer' >
                    <h1>DEX Expenses</h1>
                    <h2>Please register to create account</h2>
                    <form onSubmit={this.submitted}>
                        <Input 
                            type="text"
                            id="Name"
                            name="Name"
                            placeholder="Name" 
                            inputProps={{ 'aria-label': 'description' }}
                            style={{width: 365, height: 40}} 
                            onChange={(evt) => { this.state.name =  evt.target.value; }}/>
                        <div className="space"></div>
                        <Input 
                            type="text"
                            id="Emailid"
                            name="Emailid"
                            placeholder="Emailid" 
                            inputProps={{ 'aria-label': 'description' }}
                            style={{width: 365, height: 40}} 
                            onChange={(evt) => { this.state.emailId =  evt.target.value; }}/>
                            <div className="space"></div>
                        <Input 
                            id="Password"
                            name="Password"
                            type="Password"
                            placeholder="Password" 
                            inputProps={{ 'aria-label': 'description' }}
                            style={{width: 365, height:40}} 
                            onChange={(evt) => { this.state.password =  evt.target.value; }}/>
                        <div className="space"></div>
                        <Input 
                            type="Password"
                            id="Confirm password"
                            name="Confirm password"
                            placeholder="Confirm password"   
                            inputProps={{ 'aria-label': 'description' }}
                            style={{width: 365, height: 40}} 
                            onChange={(evt) => { this.state.confirmpassword =  evt.target.value; }}/>
                            <div className="space"></div>
                        
                        <FormGroup aria-label="position" row>
                        <Button variant="contained" color="primary" style={{backgroundColor: "#37364B" , width:370, height: 50,textTransform: 'none'}} 
                        onClick={this.validate}>
                            Sign Up
                        </Button>
                        <div className="area"></div>
                        
                        </FormGroup>
                    </form>
                </div>
            </div>
            
        </div>
        )
    }
}
export default Signup;