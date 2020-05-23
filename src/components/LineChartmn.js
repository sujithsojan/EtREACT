import React from "react";
import { Line } from "react-chartjs-2";
import axios from 'axios';
export default class LineChartmn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: {}
    }
  }
  componentDidMount() {
    axios.get(this.props.api,{params:{userId: this.props.message}})
      .then(res => {
        const response = res.data;
        let day=[];
        let amount = [];
        Array.from(response).forEach(element => {
          day.push(element.Day);
          amount.push(element.TotalExpense);
        });
        this.setState({ 
          Data: {
            labels:day,
            datasets:[
               {
          data: amount,
          fill: false,
          lineTension: 0,
          backgroundColor: '#ffffff',
          borderColor: "#F35B8c",
          pointBorderColor : '#000000',
          borderWidth: 2,  
               }
            ]
         },
          options: {
            legend: {
              display: false,
           },
            scales: {
                xAxes: [{
                  gridLines: {
                      display: true,
                      drawBorder: true, drawOnChartArea: false
                  }
              }],
                yAxes: [{
                    display: false,
                    gridLines: {
                      color: "rgba(0, 0, 0, 0)",
                      drawBorder: false,
                    }   
                }]
            },
            responsive: true,
        }
        }
         
         );
      }).catch(error => {console.log(error)
        this.setState({ErrorMessage:"Error in retrieving data"})
      }) 
    }
 

  render() {
    return (
      <div>
        <Line data={this.state.Data} 
        options={this.state.options}
        
         />
      </div>
    )
  }
}

