import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getAdmins } from '../../helpers/firestore';

import Aux from "../../hoc/_Aux";
import AddAdminModal from './AddAdminModal';

const { SearchBar } = Search;

const colums = [
    // {
    //     dataField: 'id',
    //     text: 'Product ID',
    //     Cell: row => (
    //         <div>
    //             <span title={row.value}>{row.value}</span>
    //         </div>
    //     )
    // },
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
        dataField: 'role',
        text: 'Role'
    }
];

const Admins = () => {

    const [adminsValue] = useCollection(getAdmins(), { snapshotListenOptions: { includeMetadataChanges: true } });

    const [admins, setAdmins] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleCloseEditModal = () => setShowEditModal(false);
    const handleShowEditModal = () => setShowEditModal(true);

    useEffect(() => {
        let newAdmins = [];
        adminsValue && adminsValue.docs.forEach((doc, index) => {
            const data = doc.data();
            newAdmins.push({ id: index + 1, name: data.name, email: data.email, role: data.role });
        });
        setAdmins(newAdmins);
    }, [adminsValue]);

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
                                <Button variant='primary' onClick={handleShowEditModal} >
                                    <i className="feather icon-plus"/>Add Admin
                                </Button>
                            </Card.Subtitle>
                        </Card.Header>
                        <Card.Body>
                            <ToolkitProvider
                                keyField='id'
                                data={admins}
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
                        <AddAdminModal show={showEditModal} onHide={handleCloseEditModal} />
                    </Card>
                </Col>
            </Row>
        </Aux>
    );

}

export default Admins;