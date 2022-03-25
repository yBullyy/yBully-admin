import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { useCollection } from 'react-firebase-hooks/firestore';
import ReactLoading from 'react-loading';
import CountUp from 'react-countup';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';
import LineChart from '../../components/Charts/Nvd3Chart/LineChart';
import PieBasicChart from '../../components/Charts/Nvd3Chart/PieBasicChart';
import MultiBarChart from '../../components/Charts/Nvd3Chart/MultiBarChart';
import { getStats } from '../../helpers/firestore';


const Dashboard = () => {
    const [value, statsLoading] = useCollection(getStats(), { snapshotListenOptions: { includeMetadataChanges: true } });

    const [stats, setStats] = useState({});

    useEffect(() => {
        let newStats = {};
        value && value.docs.forEach(doc => {
            newStats[doc.id] = doc.data();
            let progress = doc.data().count / doc.data().target * 100;            
            newStats[doc.id]['progress'] = Math.round(progress);
        });
        setStats(newStats);
        console.log(newStats);
    }, [value]);

    const isLoading = () => {
        return statsLoading || Object.keys(stats).length === 0;
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
                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: `${stats.total_users.progress}%`}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" />
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
                                <LineChart />
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col sm={12}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Daily Predictions</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <MultiBarChart />
                            </Card.Body>
                        </Card>
                    </Col>


                    <Col md={6}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Total Users</Card.Title>
                            </Card.Header>
                            <Card.Body className="text-center">
                                <PieBasicChart />
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} >
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Trusted Users</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <tbody>
                                        <tr className="unread">
                                            <td><img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" /></td>
                                            <td>
                                                <h6 className="mb-1">Isabella Christensen</h6>
                                                <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                            </td>
                                            <td>
                                                <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />11 MAY 12:56</h6>
                                            </td>
                                            <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">Reject</a><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12">Approve</a></td>
                                        </tr>
                                        <tr className="unread">
                                            <td><img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" /></td>
                                            <td>
                                                <h6 className="mb-1">Mathilde Andersen</h6>
                                                <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                            </td>
                                            <td>
                                                <h6 className="text-muted"><i className="fa fa-circle text-c-red f-10 m-r-15" />11 MAY 10:35</h6>
                                            </td>
                                            <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">Reject</a><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12">Approve</a></td>
                                        </tr>
                                        <tr className="unread">
                                            <td><img className="rounded-circle" style={{ width: '40px' }} src={avatar3} alt="activity-user" /></td>
                                            <td>
                                                <h6 className="mb-1">Karla Sorensen</h6>
                                                <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                            </td>
                                            <td>
                                                <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />9 MAY 17:38</h6>
                                            </td>
                                            <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">Reject</a><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12">Approve</a></td>
                                        </tr>
                                        <tr className="unread">
                                            <td><img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" /></td>
                                            <td>
                                                <h6 className="mb-1">Ida Jorgensen</h6>
                                                <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                            </td>
                                            <td>
                                                <h6 className="text-muted f-w-300"><i className="fa fa-circle text-c-red f-10 m-r-15" />19 MAY 12:56</h6>
                                            </td>
                                            <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">Reject</a><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12">Approve</a></td>
                                        </tr>
                                        <tr className="unread">
                                            <td><img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" /></td>
                                            <td>
                                                <h6 className="mb-1">Albert Andersen</h6>
                                                <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                            </td>
                                            <td>
                                                <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />21 July 12:56</h6>
                                            </td>
                                            <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">Reject</a><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12">Approve</a></td>
                                        </tr>
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