import React, { Component } from 'react';
import './card.css';
import axios from 'axios';
import Cards from './Cards';
import * as API from '../constants/Api';
class Expense extends Component{
    state ={
        items: [],
            };
      
    componentDidMount(){
        var  parts;
        let months={"01":"January","02":"February","03":"March","04":"April","05":"May","06":"June",
        "07":"July","08":"August","09":"September","10":"October","11":"November","12":"December",};
        console.log(this.props.dataA)
        if(this.props.dataA){
            axios.get(API.GET_EXPENSE,{ params: {userId:this.props.message}})
            .then(res => {
                for (var key in res.data) {
                    parts=res.data[key].DATE.split("-");
                    res.data[key].DATE = parts[2]+' '+months[parts[1]]+', '+parts[0]
                    res.data[key].AMOUNT = res.data[key].AMOUNT.toFixed(2);
                    //res.data[key]["colour"]="#F35B8C";
                }
            this.setState({items: res.data});
            });
            console.log(this.state.items.DATE);
        }
        
        if(this.props.dataB){
            axios.get(API.GET_INCOME,{ params: {userId:this.props.message}})
            .then(res => {
                for (var key in res.data) {
                    parts=res.data[key].DATE.split("-");
                    res.data[key].DATE = parts[2]+' '+months[parts[1]]+', '+parts[0]
                    res.data[key].AMOUNT = res.data[key].AMOUNT.toFixed(2);
                    res.data[key]["colour"]="#F35B8C";
                }
            this.setState({items: res.data});
            });
        }

        if(this.props.dataBoth){
            axios.get(API.GET_INCOME_EXPENSE,{ params: {userId: this.props.message}})
            .then(res => {
                for (var key in res.data) {
                    parts=res.data[key].DATE.split("-");
                    res.data[key].DATE = parts[2]+' '+months[parts[1]]+', '+parts[0]
                    res.data[key].AMOUNT = res.data[key].AMOUNT.toFixed(2);
                    res.data[key]["colour"]="#F35B8C";
                }
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