import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './card.css';
import SimpleMenu from './Menus';
import Expense from './Api_Expense';

class CheckBox extends Component{
  constructor(props) {
    super(props);
    this.state = {isCheckedA: false};
    this.state = {isCheckedB: false};
    this.handleCheckedA = this.handleCheckedA.bind(this);
    this.handleCheckedB = this.handleCheckedB.bind(this); 
  }
  
  handleCheckedA () { this.setState({isCheckedA: !this.state.isCheckedA}); }
  handleCheckedB () { this.setState({isCheckedB: !this.state.isCheckedB}); }
  
  render(){
    const isCheckedA = this.state.isCheckedA;
    const isCheckedB = this.state.isCheckedB;
    let expense,income,both;
    
    if (isCheckedA && !isCheckedB) { expense = <Expense dataA={this.state.isCheckedA} message = {this.props.message} />; }
    if (isCheckedB && !isCheckedA) { income = <Expense dataB={this.state.isCheckedB} message = {this.props.message}/>; }
    if (isCheckedB && isCheckedA){ both = <Expense dataBoth={this.state.isCheckedA} message = {this.props.message}/>; }
    return(
      <div>
        <header style={{paddingTop:"30px", paddingBottom:"50px", }}>
          <div class="row" id="id">
            <div class="block"><FormControlLabel className="expense1"
                control={<Checkbox  style={{color:"#F35B8C", visibility:"visible",}} name="checkedA" onChange={ this.handleCheckedA }/>}
                label="Expense" /></div>
                    
            <div class="block"><FormControlLabel className="income1"
                control={<Checkbox style={{color:"#69B5FF",  }} name="checkedB" onChange={ this.handleCheckedB } />}
                label="Income"/></div>

            <div class="block"><SimpleMenu/></div>
          </div>
        </header>
        <div style={{marginTop:"10px"}}> {expense}    </div>   
        <div style={{marginTop:"10px"}}> {income}    </div>   
        <div style={{marginTop:"10px"}}> {both}    </div>             
      </div>                   
    );
  }
}

export default CheckBox;