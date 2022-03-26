import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getOnlyUsers } from '../../helpers/firestore';

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
    const [usersValue] = useCollection(getOnlyUsers(), { snapshotListenOptions: { includeMetadataChanges: true } });
    const [showEditModal, setShowEditModal] = useState(false);
    const [usersData, setUsersData] = useState([]);
    const [activeUser, setActiveUser] = useState(0);

    const handleCloseEditModal = () => setShowEditModal(false);
    const handleShowEditModal = () => setShowEditModal(true);

    useEffect(() => {
        let newUsersData = [];
        usersValue && usersValue.docs.forEach((doc, index) => {
            const data = doc.data();
            newUsersData.push({ ...data, id: index + 1, name: data.name, role: data.role, edit: editIcon(index), trustscore: data.trustScore, email: data.email });
        });
        setUsersData(newUsersData);
    }, [usersValue]);


    const editIcon = (userIndex) => {
        return <div
            style={{ textAlign: 'center', cursor: 'pointer' }}
            onClick={() => {
                setActiveUser(userIndex);
                handleShowEditModal();
            }}
        >
            <i className="feather icon-edit" />
        </div>;
    }

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
                                data={usersData}
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
                        <EditModal show={showEditModal} onHide={handleCloseEditModal} users={usersData} activeUser={activeUser} />
                    </Card>
                </Col>
            </Row>
        </Aux>
    );

}

export default Users;