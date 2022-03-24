import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import Aux from "../../hoc/_Aux";

const colums = [
    {
        dataField: 'id',
        text: 'Product ID'
    },
    {
        dataField: 'name',
        text: 'Product Name'
    }
];
const rows = [
    { id: '1', name: 'Book 1' },
    { id: '2', name: 'Book 2' },
    { id: '3', name: 'Book 3' },
    { id: '4', name: 'Book 4' },
    { id: '5', name: 'Book 5' },
    { id: '6', name: 'Book 5' },
    { id: '7', name: 'Book 5' },
    { id: '8', name: 'Book 5' },
    { id: '9', name: 'Book 5' },
    { id: '10', name: 'Book 5' },
    { id: '11', name: 'Book 5' },
    { id: '12', name: 'Book 6' }
];

const Users = () => {
    return (
        <Aux>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">All Users</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <BootstrapTable
                                keyField='id'
                                data={rows}
                                columns={colums}
                                pagination={paginationFactory({ sizePerPage: 7, hideSizePerPage: true, hidePageListOnlyOnePage: true })}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );

}

export default Users;