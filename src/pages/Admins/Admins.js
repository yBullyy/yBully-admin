import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import Aux from "../../hoc/_Aux";

const { SearchBar } = Search;

const colums = [
    {
        dataField: 'id',
        text: 'Product ID',
        Cell: row => (
            <div>
                <span title={row.value}>{row.value}</span>
            </div>
        )
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

const Admins = () => {
    const afterSearch = (newResult) => {
        console.log(newResult);
    };

    return (
        <Aux>
            <Row>
                <Col>
                    <Card>
                        <Card.Header style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Card.Title as="h5">
                                All Admins
                            </Card.Title>
                            <Card.Subtitle>
                                <Button variant='primary' >
                                    <i className="feather icon-plus"/>Add Admin
                                </Button>
                            </Card.Subtitle>
                        </Card.Header>
                        <Card.Body>
                            <ToolkitProvider
                                keyField='id'
                                data={rows}
                                columns={colums}
                                search={{afterSearch}}
                            >
                                {
                                    props => (
                                        <div>
                                            <SearchBar { ...props.searchProps } />
                                            <BootstrapTable
                                                pagination={paginationFactory({ sizePerPage: 7, hideSizePerPage: true, hidePageListOnlyOnePage: true })}
                                                { ...props.baseProps }
                                            />
                                        </div>
                                    )
                                }

                            </ToolkitProvider>
                            {/* <BootstrapTable
                                keyField='id'
                                data={rows}
                                columns={colums}
                                pagination={paginationFactory({ sizePerPage: 7, hideSizePerPage: true, hidePageListOnlyOnePage: true })}
                            /> */}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );

}

export default Admins;