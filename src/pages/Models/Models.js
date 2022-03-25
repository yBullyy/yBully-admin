import React from "react";
import { Card, Button } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";

const Models = () => {
    return (
        <Aux>
            <Card>
                <Card.Body>
                    <Card.Title>Model 1</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Accuracy: 90%</Card.Subtitle>
                    <Card.Text>
                        <p>Trained on: 25 / 10 / 2022</p>
                        <i className="fa fa-circle text-c-green f-10 m-r-15"/> Active
                    </Card.Text>
                    {/* <Card.Link href="#">Card Link</Card.Link> */}
                    {/* <Card.Link href="#">Another Link</Card.Link> */}
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <Card.Title>Model 2</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Accuracy: 94%</Card.Subtitle>
                    <Card.Text>
                        <p>Trained on: 23 / 10 / 2022</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                            <div>
                                <i className="fa fa-circle text-c-red f-10 m-r-15"/> Inactive
                            </div>                        
                            <Button variant="primary" size="sm" className="m-l-10" >
                                Activate
                            </Button>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <Card.Title>Model 2</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Accuracy: 94%</Card.Subtitle>
                    <Card.Text>
                        <p>Trained on: 23 / 10 / 2022</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                            <div>
                                <i className="fa fa-circle text-c-red f-10 m-r-15"/> Inactive
                            </div>                        
                            <Button variant="primary" size="sm" className="m-l-10" >
                                Activate
                            </Button>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
            
        </Aux>
    );
}

export default Models;