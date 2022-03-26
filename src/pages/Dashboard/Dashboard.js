import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { useCollection } from 'react-firebase-hooks/firestore';
import ReactLoading from 'react-loading';
import CountUp from 'react-countup';

import Aux from "../../hoc/_Aux";

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import LineChart from '../../components/Charts/Nvd3Chart/LineChart';
import PieBasicChart from '../../components/Charts/Nvd3Chart/PieBasicChart';
import MultiBarChart from '../../components/Charts/Nvd3Chart/MultiBarChart';
import { getDailyScans, getStats, getTop5Users, getUsers } from '../../helpers/firestore';


const Dashboard = () => {
    const [statsValue, statsLoading] = useCollection(getStats(), { snapshotListenOptions: { includeMetadataChanges: true } });
    const [dailyScansValue, dailyScansLoading] = useCollection(getDailyScans(), { snapshotListenOptions: { includeMetadataChanges: true } });
    const [usersValue, usersLoading] = useCollection(getUsers(), { snapshotListenOptions: { includeMetadataChanges: true } });
    const [top5UsersValue, top5UsersLoading] = useCollection(getTop5Users(), { snapshotListenOptions: { includeMetadataChanges: true } });

    const [stats, setStats] = useState({});
    const [dailyScansData, setDailyScansData] = useState([]);
    const [users, setUsers] = useState([]);
    const [top5Users, setTop5Users] = useState([]);

    
    useEffect(() => {
        let newStats = {};
        statsValue && statsValue.docs.forEach(doc => {
            newStats[doc.id] = doc.data();
            let progress = doc.data().count / doc.data().target * 100;
            newStats[doc.id]['progress'] = Math.round(progress);
        });

        let newDailyScansData = [];
        dailyScansValue && dailyScansValue.docs.forEach(doc => {
            let data = doc.data();
            newDailyScansData.push(data);
        });

        let newUsers = [];
        usersValue && usersValue.docs.forEach(doc => {
            let data = doc.data();
            newUsers.push(data);
        });

        let newTop5Users = [];
        top5UsersValue && top5UsersValue.docs.forEach(doc => {
            let data = doc.data();
            newTop5Users.push(data);
        });

        console.log(newTop5Users);

        setStats(newStats);
        setDailyScansData(newDailyScansData);
        setUsers(newUsers);
        setTop5Users(newTop5Users);
        
    }, [statsValue, dailyScansValue, usersValue, top5UsersValue]);

    const isLoading = () => {
        return statsLoading || dailyScansLoading || usersLoading || Object.keys(stats).length === 0;
    }

    return (
        isLoading()
            ?
            <div style={{ display: 'flex', justifyContent: 'center' }} >
                <ReactLoading color='#3f4d67' type='spinningBubbles' height={100} width={100} />
            </div>
            : <Aux>
                <Row>
                    <Col md={6} xl={3}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Total Predictions</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                            {/* <i className="feather icon-arrow-up text-c-green f-30 m-r-5"/>  */}
                                            <CountUp start={0} end={stats.total_predictions.count} duration={2} separator="," />
                                            {/* { stats.total_predictions } */}
                                        </h3>
                                    </div>

                                    <div className="col-3 text-right">
                                        <p className="m-b-0">{stats.total_predictions.progress}%</p>
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{ height: '7px' }}>
                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: `${stats.total_predictions.progress}%` }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={3}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Total Bully Predictions</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                            {/* <i className="feather icon-arrow-down text-c-red f-30 m-r-5" />  */}
                                            <CountUp start={0} end={stats.total_bully_predictions.count} duration={2} separator="," />
                                            {/* { stats.total_bully_predictions } */}
                                        </h3>
                                    </div>

                                    <div className="col-3 text-right">
                                        <p className="m-b-0">{stats.total_bully_predictions.progress}%</p>
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{ height: '7px' }}>
                                    <div className="progress-bar progress-c-theme3" role="progressbar" style={{ width: `${stats.total_bully_predictions.progress}%` }} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100" />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={3}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Total Users</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                            {/* <i className="feather icon-arrow-up text-c-green f-30 m-r-5" />  */}
                                            <CountUp start={0} end={stats.total_users.count} duration={2} separator="," />
                                            {/* { stats.total_users } */}
                                        </h3>
                                    </div>

                                    <div className="col-3 text-right">
                                        <p className="m-b-0">{stats.total_users.progress}%</p>
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{ height: '7px' }}>
                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: `${stats.total_users.progress}%` }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={3}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Total Reports</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                            {/* <i className="feather icon-arrow-up text-c-green f-30 m-r-5" />  */}
                                            <CountUp start={0} end={stats.total_reports.count} duration={2} separator="," />
                                            {/* { stats.total_reports } */}
                                        </h3>
                                    </div>

                                    <div className="col-3 text-right">
                                        <p className="m-b-0">{stats.total_reports.progress}%</p>
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{ height: '7px' }}>
                                    <div className="progress-bar progress-c-theme3" role="progressbar" style={{ width: `${stats.total_reports.progress}%` }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={12}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Daily Scans</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <LineChart data={dailyScansData} />
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col sm={12}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Daily Predictions</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <MultiBarChart data={dailyScansData} />
                            </Card.Body>
                        </Card>
                    </Col>


                    <Col md={6}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Total Users</Card.Title>
                            </Card.Header>
                            <Card.Body className="text-center">
                                <PieBasicChart data={users} />
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} >
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Top 5 Trusted Users</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <thead>
                                        <tr>
                                            <th className='text-center'>#</th>
                                            <th>User</th>
                                            <th>Trust Score</th>
                                            <th>Approved Tweets</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {
                                            top5Users.map((user, index) =>
                                                <tr className="unread" key={user.uid} >
                                                    <td><img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" /></td>
                                                    <td>
                                                        <h6 className="mb-1">{user.name}</h6>
                                                        <p className="m-0">{user.email}</p>
                                                    </td>
                                                    <td>
                                                        <h6 className="text-muted">
                                                            {user.trustScore}%
                                                        </h6>
                                                    </td>
                                                    <td>
                                                        <h6 className="text-muted">
                                                            {user.totalApprovedTweets}
                                                        </h6>
                                                    </td>
                                                    {/* <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">Reject</a><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12">Approve</a></td> */}
                                                </tr>
                                            )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
    );
}

export default Dashboard;