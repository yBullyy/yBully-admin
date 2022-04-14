import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { useCollection } from 'react-firebase-hooks/firestore';
import ReactLoading from 'react-loading';

import Aux from "../../hoc/_Aux";

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import LineChart from '../../components/Charts/LineChart';
import PieBasicChart from '../../components/Charts/PieBasicChart';
import MultiBarChart from '../../components/Charts/MultiBarChart';
import StatsContainer from '../../components/StatsContainer';
import { getDailyReports, getDailyScans, getStats, getTop5Users, getUsers } from '../../helpers/firestore';


const Dashboard = () => {
    const [statsValue, statsLoading] = useCollection(getStats(), { snapshotListenOptions: { includeMetadataChanges: true } });
    const [dailyScansValue, dailyScansLoading] = useCollection(getDailyScans(), { snapshotListenOptions: { includeMetadataChanges: true } });
    const [usersValue, usersLoading] = useCollection(getUsers(), { snapshotListenOptions: { includeMetadataChanges: true } });
    const [top5UsersValue, top5UsersLoading] = useCollection(getTop5Users(), { snapshotListenOptions: { includeMetadataChanges: true } });
    const [dailyReportsValue, dailyReportsLoading] = useCollection(getDailyReports(), { snapshotListenOptions: { includeMetadataChanges: true } });

    const [stats, setStats] = useState({});
    const [dailyScansData, setDailyScansData] = useState([]);
    const [dailyreportsData, setDailyreportsData] = useState([]);
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

        let newDailyreportsData = [];
        dailyReportsValue && dailyReportsValue.docs.forEach(doc => {
            let data = doc.data();
            newDailyreportsData.push(data);
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

        setStats(newStats);
        setDailyScansData(newDailyScansData);
        setDailyreportsData(newDailyreportsData);
        setUsers(newUsers);
        setTop5Users(newTop5Users);
        
    }, [statsValue, dailyScansValue, usersValue, top5UsersValue, dailyReportsValue]);

    const isLoading = () => {
        return statsLoading || dailyScansLoading || dailyReportsLoading || usersLoading || top5UsersLoading || Object.keys(stats).length === 0;
    }

    const getDailyScansChartData = () => {
        var data = [];
        dailyScansData.forEach(e => {
            let splitDate = e.date.split('-');            
            data.push({
                'x': new Date(splitDate[2], splitDate[1] - 1, splitDate[0]),
                'y': e.bullyCount + e.noBullyCount
            });            
        });
        return [{
                values: data,
                key: 'Daily Scans',
                color: '#A389D4',
                area: true
            }];
    }

    const getDailyReportsChartData = () => {
        var data = [];
        dailyreportsData.forEach(e => {
            let splitDate = e.date.split('-');
            data.push({
                'x': new Date(splitDate[2], splitDate[1] - 1, splitDate[0]),
                'y': e.reportCount
            });
        });
        return [{
                values: data,
                key: 'Daily Reports',
                color: '#1de9b6',
                area: true
            }];
    }

    return (
        isLoading()
            ?
            <div style={{ display: 'flex', justifyContent: 'center' }} >
                <ReactLoading color='#3f4d67' type='spinningBubbles' height={100} width={100} />
            </div>
            : <Aux>
                <Row>
                    <StatsContainer 
                        title={"Total Predictions"} 
                        count={stats.total_predictions.count} 
                        progress={stats.total_predictions.progress} 
                    />
                    <StatsContainer 
                        title={"Total Bully Predictions"} 
                        count={stats.total_bully_predictions.count} 
                        progress={stats.total_bully_predictions.progress} 
                        progressBarTheme="progress-c-theme3" 
                    />
                    <StatsContainer 
                        title={"Total Users"} 
                        count={stats.total_users.count} 
                        progress={stats.total_users.progress} 
                    />
                    <StatsContainer 
                        title={"Total Reports"} 
                        count={stats.total_reports.count} 
                        progress={stats.total_reports.progress} 
                        progressBarTheme="progress-c-theme3" 
                    />

                    <Col md={12}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Daily Scans</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <LineChart getData={getDailyScansChartData} xAxisLabel="Date" yAxisLabel="Count" />
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

                    <Col sm={12}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Daily Reports</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <LineChart getData={getDailyReportsChartData} xAxisLabel="Date" yAxisLabel="Count" />
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