import React, {Component} from "react";
import {Button,Form} from 'react-bootstrap';

class FormularMedici extends Component{
    state = {
        nume: '',
        prenume: '',
        dataNasterii: '',
        sex: ['Barbat','Femeie'],
        specializare: '' 
    }
    
    render(){

        return(
          <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '50px 0'
          }}>

            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nume</Form.Label>
                <Form.Control type="text" placeholder="Enter nume" />
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Prenume</Form.Label>
                <Form.Control type="text" placeholder="Enter prenume" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="radio" id='default-radio' label={this.state.sex[0]} />
                <Form.Check type="radio" label={this.state.sex[1]} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>
          </div>
        )
    }

}

export default FormularMedici;