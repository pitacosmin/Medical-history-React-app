import React, {Component} from 'react';
// import {div} from 'react-bootstrap';
import MediciFunctions from '../functions/mediciFunctions';
import Medic from './Medic/Medic';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class Medici extends Component{
    state = {
            medicList: [],
            functions: new MediciFunctions(),
        }

    async componentDidMount(){
        this.state.functions.getAllMedici();
        this.state.functions.emitter.addListener("GET_MEDICI_SUCCES", ()=>{
            this.setState({
                medicList: this.state.functions.medici
            });
        });
        
    }
    
    render(){
        return(
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>

            
            <div style={{
                display: 'grid',
                margin: '50px 100px',
                gridTemplateColumns: 'repeat(3, minmax(200px,1fr))',
                gridGap: '50px'
            }}>
                {this.state.medicList.length!==0 ? 
                this.state.medicList.map((value,index)=> (
                    <Medic key={index} medic={value} />
                )) : null}
            </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',

                    alignItems: 'center'
                }}>
                    <Link to="/formularMedici">
                    <Button variant="outline-primary" size='lg'>Add medic</Button>    
                    </Link>
                </div>

            </div>
        );
    }

}

export default Medici;