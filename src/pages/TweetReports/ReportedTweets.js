import React, { useEffect, useState } from "react";
import { Row, Col, Tabs, Tab, Table, Button } from "react-bootstrap";
import ReactLoading from 'react-loading';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

import { useCollection } from "react-firebase-hooks/firestore";
import { batchAddApprovedTweets, batchDeleteReportedTweets, getReportedTweets } from "../../helpers/firestore";
import { toast } from "react-toastify";

const ReportedTweets = () => {

    const [allReportsValue] = useCollection(getReportedTweets(), { snapshotListenOptions: { includeMetadataChanges: true } });

    const [allReports, setAllReports] = useState([]);
    const [approvedReports, setApprovedReports] = useState([]);
    const [rejectedReports, setRejectedReports] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let newAllReports = [];
        allReportsValue && allReportsValue.docs.forEach((doc) => {
            newAllReports.push(doc.data());
        });

        setAllReports(newAllReports);
    }, [allReportsValue]);

    const handleApprove = (index, data, setData) => {
        const newData = [...data];
        let approvedTweet = newData.splice(index, 1);
        setData(newData);
        setApprovedReports([...approvedReports, ...approvedTweet]);
    };

    const handleReject = (index, data, setData) => {
        const newData = [...data];
        let rejectedTweet = newData.splice(index, 1);
        setData(newData);
        setRejectedReports([...rejectedReports, ...rejectedTweet]);
    };
    const handleConfirmChanges = () => {
        setIsLoading(true);
        try {
            if (approvedReports.length > 0) {
                const approvedTweetIds = approvedReports.map(approvedTweet => approvedTweet.tweetId);
                console.log(approvedTweetIds);
                // delete approved tweets from all reports
                batchDeleteReportedTweets(approvedTweetIds);
                // add approved reports to approvedTweets collection
                batchAddApprovedTweets(approvedReports);
                setApprovedReports([]);
            }

            if (rejectedReports.length > 0) {
                // delete rejected reports from reportedTweets collection if present
                const rejectedTweetIds = rejectedReports.map(rejectedTweet => rejectedTweet.tweetId);
                // delete rejected tweets from all reports
                batchDeleteReportedTweets(rejectedTweetIds);
                setRejectedReports([]);
            }
            toast.success("Changes saved successfully");
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
        setIsLoading(false);
    };

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) {
            newWindow.opener = null;
        }
    }

    const getTabContent = (data, setData, tabName) => {
        return (
            <Aux>
                <Table responsive hover>
                    <thead style={{ textAlign: 'center' }} >
                        <tr>
                            <th>Sr No.</th>
                            <th>Tweet</th>
                            <th>Correct Label</th>
                            <th>Report Count</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center' }} >
                        {
                            data.map((item, index) => {
                                return (
                                    <tr key={item.tweetId} className="unread">
                                        <td><h6 className="mb-1">{index + 1}</h6></td>
                                        {/* <td><img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" /></td> */}
                                        {/* <td>
                                            <h6 className="mb-1">{item.name}</h6>
                                            <p className="m-0">{item.email}</p>
                                        </td> */}
                                        <td onClick={() => openInNewTab(item.tweetUrl)} style={{ cursor: 'pointer' }}><h6 className="mb-1">{item.tweetText}</h6></td>
                                        <td><h6 className="mb-1">{item.correctLabel}</h6></td>
                                        <td><h6 className="mb-1">{item.reportCount}</h6></td>
                                        {/* <td>
                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />11 MAY 12:56</h6>
                                        </td> */}
                                        <td>
                                            {
                                                tabName !== "rejected" && <a onClick={() => handleReject(index, data, setData)} href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">Reject</a>
                                            }
                                            {
                                                tabName !== "approved" && <a onClick={() => handleApprove(index, data, setData)} href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12">Approve</a>
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Aux>
        );
    };

    return (
        <Aux>
            <Row>
                <Col className='m-b-30'>
                    <Tabs defaultActiveKey="all" id="uncontrolled-tab-example">
                        <Tab eventKey="all" title={`All (${allReports.length})`}>
                            {getTabContent(allReports, setAllReports, 'all')}
                        </Tab>
                        <Tab eventKey="approved" title={`Approved (${approvedReports.length})`}>
                            {getTabContent(approvedReports, setApprovedReports, 'approved')}
                        </Tab>
                        <Tab eventKey="rejected" title={`Rejected (${rejectedReports.length})`}>
                            {getTabContent(rejectedReports, setRejectedReports, 'rejected')}
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
            <div style={{ display: 'flex', flexDirection: 'row-reverse' }} >
                <Button onClick={handleConfirmChanges} variant="primary" >
                    {
                        isLoading
                            ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                                <ReactLoading type="spinningBubbles" color="#fff" height={20} width={20} />
                            </div>
                            : "Confirm Changes"
                    }
                </Button>
            </div>
        </Aux>
    );
}

export default ReportedTweets;