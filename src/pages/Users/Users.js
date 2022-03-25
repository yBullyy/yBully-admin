import React, { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import Aux from "../../hoc/_Aux";
import EditModal from './EditModal';

const { SearchBar } = Search;

const colums = [
    {
        dataField: 'id',
        text: 'S.N.',
    },
    {
        dataField: 'name',
        text: 'Name'
    },
    {
        dataField: 'email',
        text: 'Email'
    },
    {
        dataField: 'trustscore',
        text: 'Trust Score'
    },
    {
        dataField: 'role',
        text: 'Role'
    },
    {
        dataField: 'edit',
        text: 'Edit'
    },
];

const Users = () => {
    const [showEditModal, setShowEditModal] = useState(false);

    const handleCloseEditModal = () => setShowEditModal(false);
    const handleShowEditModal = () => setShowEditModal(true);


    const editIcon = <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={handleShowEditModal} ><i className="feather icon-edit" /></div>;
    const rows = [
        { id: '1', name: 'shubh', email: 'email@abc.com', role: 'admin', trustscore: '100%', edit: editIcon },
        { id: '2', name: 'shubh', email: 'email@abc.com', role: 'admin', trustscore: '100%', edit: editIcon },
        { id: '3', name: 'shubh', email: 'email@abc.com', role: 'admin', trustscore: '100%', edit: editIcon },
        { id: '4', name: 'shubh', email: 'email@abc.com', role: 'admin', trustscore: '100%', edit: editIcon },
        { id: '5', name: 'shubh', email: 'email@abc.com', role: 'admin', trustscore: '100%', edit: editIcon },
        { id: '6', name: 'shubh', email: 'email@abc.com', role: 'admin', trustscore: '100%', edit: editIcon },
        { id: '7', name: 'shubh', email: 'email@abc.com', role: 'admin', trustscore: '100%', edit: editIcon },
        { id: '8', name: 'shubh', email: 'email@abc.com', role: 'admin', trustscore: '100%', edit: editIcon },
        { id: '9', name: 'shubh', email: 'email@abc.com', role: 'admin', trustscore: '100%', edit: editIcon },
        { id: '10', name: 'shubh', email: 'email@abc.com', role: 'admin', trustscore: '100%', edit: editIcon },
    ];

    return (
        <Aux>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">All Users</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <ToolkitProvider
                                keyField='id'
                                data={rows}
                                columns={colums}
                                search
                            >
                                {
                                    props => (
                                        <div>
                                            <SearchBar {...props.searchProps} />
                                            <BootstrapTable
                                                pagination={paginationFactory({ sizePerPage: 7, hideSizePerPage: true, hidePageListOnlyOnePage: true })}
                                                {...props.baseProps}
                                            />
                                        </div>
                                    )
                                }

                            </ToolkitProvider>
                        </Card.Body>
                        <EditModal show={showEditModal} onHide={handleCloseEditModal} />
                    </Card>
                </Col>
            </Row>
        </Aux>
    );

}

export default Users;