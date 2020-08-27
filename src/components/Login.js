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
class Login extends Component {    
state = {
    username:'',
    password:'',
    User : [],
    showError: false 
};
    validate = (state) =>{
        var uname = this.state.username;
        var pass =  this.state.password;
        //console.log(errormsg)
        
        if(uname===null || uname === '' || pass===null || pass==='')
            {
                errormsg="Username / Password Missing!!!";
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
        else if (pass.length < 8) {
            errormsg='Password must be 8 or more characters!!!';
            this.setState((prevState, props) => {
                return { showError: true }
              })
              }
        else {
             //browserHistory.push('/Home');
            var uri = 'http://localhost:8081/tracker/register/';
            var loginUrl= uri + uname +'/'+ pass;
            axios.get(loginUrl)
            .then(response => (response.data))
            .then((data)=>{
            this.setState({User:data})
            console.log(this.state.User);
            if(this.state.User.length === 0)
              {
                errormsg="Username / Password Incorrect!!!";
                this.setState((prevState, props) => {
                    return { showError: true }
                  })
              }
              else{
                this.setState((prevState, props) => {
                    return { showError: false }
                  })


                this.state.User.map((userlist)=>
         (
            browserHistory.push("/Home/" + userlist.id + "/" + userlist.name)
             
         ))
                  
                
              }  
            })
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
                    <h2>Please login to your account.</h2>
                    <form onSubmit={this.submitted}>
                        <Input 
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username" 
                            inputProps={{ 'aria-label': 'description' }}
                            style={{width: 365, height: 40}} 
                            onChange={(evt) => { this.state.username =  evt.target.value; }}/>
                        <div className="space"></div>
                        <Input 
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password" 
                            inputProps={{ 'aria-label': 'description' }}
                            style={{width: 365, height:40}} 
                            onChange={(evt) => { this.state.password =  evt.target.value; }}/>
                        <div className="space"></div>
                        <FormGroup aria-label="position" row>
                        <FormControlLabel
                            value="check"
                            control={<Checkbox color="#000000" />}
                            label="Remember me"
                            labelPlacement="Remember me"
                        />
                        <Link href="#" onClick={preventDefault} color="inherit" style={{height:50, paddingTop:30, paddingLeft:90}}>
                            {'Forgot Password'}
                        </Link>
                        </FormGroup>
                        <FormGroup aria-label="position" row>
                        <Button variant="contained" color="primary" style={{backgroundColor: "#37364B", width:170, height: 50}} 
                        onClick={this.validate}>
                            Login
                        </Button>
                        <div className="area"></div>
                        <Button variant="contained" style={{backgroundColor: "#FFFFFF", width:170, height: 50}}>{'Sign Up'}</Button>
                        </FormGroup>
                    </form>
                </div>
            </div>
            
        </div>
        )
    }
}
export default Login;