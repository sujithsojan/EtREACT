import React, { Component } from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import axios from 'axios';
import * as API from '../constants/Api';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default class TotalBaryr extends Component
{
   constructor(props) {
      super(props);
      this.state = {
        Data: {}
      }
    }
       
      componentDidMount() {
        axios.get(API.BAR_YEAR,{params:{userId: this.props.message}})
          .then(res => {
            
            let amount=[];
            amount.push(res.data.TotalIncome);
            amount.push(res.data.TotalExpense);
            console.log(amount)
            this.setState({ 
              Data: {
                labels:['Income','Expense'],
                datasets:[
                   {
                      data: amount,
                      borderColor: '  rgb(255, 255, 255)',
                      // backgroundColor:["rgba(105,181,255)","rgba(243,91,140)"]
                      backgroundColor:["#69B5FF","#F35B8c"]
                    
                   }
                ]
             }
             });

          }).catch(error => {console.log(error)
            this.setState({ErrorMessage:"Error in retrieving data"})
          })
        }
 render()
   {
     return(
      <div>
          <HorizontalBar
            data = {this.state.Data}
            options = {chartoptions} 
            width= {400}
            plugins={[ChartDataLabels]}/>
        </div>
      )
   }   
}

const chartoptions = {
  tooltips:{
    yPadding : 0.1,
    xPadding  : 0.1
},
barValueSpacing : 1,       
barDatasetSpacing : 1,

responsive: true,
   legend: {
    display: false,
 },
  scales:{
    xAxes:[{
      categorySpacing: 0,
      ticks: {
        display:false,
        beginAtZero: true
    },
  gridLines:{
    display:false,
    color: "rgba(0, 0, 0, 0)"
  }
}],
      yAxes:[{
        barPercentage: 0.9,
          
          ticks: {
              display:false,
              backdropPaddingX: -10,
              beginAtZero: true
             
          },
          categoryPercentage: 1,
           minBarLength: 2,
          gridLines: {
              display:false,
              color: "rgba(0, 0, 0, 0)"
          }

}]
},
plugins: {
  datalabels: {
    align: function(context) {
      var index = context.dataIndex;
      var value = context.dataset.data[index];
      var invert = Math.abs(value) <= 1;
      return value < 1 ? 'right' : 'right'
    },
    anchor: 'start',
    backgroundColor: null,
    borderColor: null,
    borderRadius: 4,
    borderWidth: 1,
    color: '#ffffff',
    font: {
      size: 25,
      weight: 600
    },
    offset: 4,
    padding: 0,
    formatter: function(value) {
      return Math.round(value * 10) / 10
    }
  }
}
}