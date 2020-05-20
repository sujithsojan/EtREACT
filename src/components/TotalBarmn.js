import React, { Component } from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import axios from 'axios';
import * as API from '../constants/Api';

export default class TotalBarmn extends Component
{
   constructor(props) {
      super(props);
      this.state = {
        Data: {}
      }
    }
       
      componentDidMount() {
        axios.get(API.BAR_MONTH,{params:{userId: this.props.message}})
          .then(res => {
            let amount=[];
            amount.push(res.data.TotalIncome);
            amount.push(res.data.TotalExpense);
            this.setState({ 
              Data: {
                labels:['Income','Expense'],
                datasets:[
                   {
                      data: amount,
                      borderColor: '  rgb(255, 255, 255)',
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
            width= {400}  />
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
animation: {
 duration: 1,
 onComplete: function () {
     var chartInstance = this.chart,
         ctx = chartInstance.ctx;
     ctx.textAlign = 'left';
    
     ctx.fillStyle = "rgba(255, 255, 255, 255)";
     ctx.textBaseline = 'centre';
     
     

     this.data.datasets.forEach(function (dataset, i) {
         var meta = chartInstance.controller.getDatasetMeta(i);
         meta.data.forEach(function (bar, index) {
             var data = dataset.data[index];
             ctx.fillText(data, (bar._model.x-bar._model.x)+10, bar._model.y -5);
             

         });
     });
 }
}
}

 
