import React, { Component } from 'react';
import './card.css';
import axios from 'axios';
import Cards from './Cards';

class Expense extends Component{
    state ={
        items: [],
            };
      
    componentDidMount(){
        console.log(this.props.dataA)
        if(this.props.dataA){
            axios.get("http://localhost:8081/tracker/register/getExpense",{ params: {uSER_ID:this.props.message}})
            .then(res => {
            this.setState({items: res.data});
            });
            console.log(this.state.items.DATE);
        }
        
        if(this.props.dataB){
            axios.get("http://localhost:8081/tracker/register/getIncome",{ params: {uSER_ID:this.props.message}})
            .then(res => {
            this.setState({items: res.data});
            });
        }

        if(this.props.dataBoth){
            axios.get("http://localhost:8081/tracker/register/getIncomeExpense",{ params: {uSER_ID: this.props.message}})
            .then(res => {
            this.setState({items: res.data});
            });
        }
          
    }
    render(){
        var {items}=this.state;
        
        return(
            
         <div><Cards items={items}/></div>
        )
    }
}
export default Expense;