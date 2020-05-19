import React from "react";
import { Line } from "react-chartjs-2";
import axios from 'axios';
// import { MDBContainer } from "mdbreact";

export default class LineChartyr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: {}
    }
  }
  componentDidMount() {
    axios.get(`http://localhost:8081/tracker/register/TotalExpenseTotalIncomeLine_year`,{params:{userId: this.props.message}})
      .then(res => {
        const response = res.data;
        let month=[];
        let amount = [];
        Array.from(response).forEach(element => {
          month.push(element.Month);
          amount.push(element.TotalExpense);
        });
        this.setState({ 
          Data: {
            labels:month,
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
         console.log(this.state.Data)
      }).catch(error => {console.log(error)
        this.setState({ErrorMessage:"Error in retrieving data"})
      }) 
    }
 

  render() {
    return (
      <div>
        {/* <h3 className="mt-5"></h3> */}
        <Line data={this.state.Data} options={this.state.options} />
      </div>
    )
  }
}

