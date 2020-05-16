import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import './card.css';

class Cards extends Component{
    
    render(){ 
        
        var items = this.props.items;
       console.log( new Intl.DateTimeFormat('en-US', {
            year: "numeric",
            month: "long",
            day: "2-digit"
          }).format(items.DATE));
       
        return(
           
            <div> 
                {items.map(item =>(
                    <Card  style={{width:"100%",paddingTop:"10px", paddingBottom:"10px",marginBottom:"20px"}}>
                        
                            <mat-card  class="card-container" style={{color:"#F35B8C" }} >
                                <mat-card-title class="card-container-right" >{item.DATE}</mat-card-title>
                                <mat-card-title className="card-container-left" > {item.CATEGORY}
                                </mat-card-title>  
                            </mat-card>

                            <mat-card  class="card-container" style={{color:"#000000" }} >
                                <mat-card-title class="card-container-right"  > {item.ITEM}</mat-card-title>
                                <mat-card-title className="card-container-left"  > {item.AMOUNT}
                                </mat-card-title>  
                            </mat-card>
                    </Card>
                ))}
        </div>     
        );
    }
}

export default Cards;