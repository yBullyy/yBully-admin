import React, { useEffect, useState } from "react";
import { Row, Col, Table, Button, Card } from "react-bootstrap";
import ReactLoading from 'react-loading';

import Aux from "../../hoc/_Aux";
import CONSTANTS from "../../store/constant";

import { useCollection } from "react-firebase-hooks/firestore";
import { batchDeleteApprovedTweets, deleteSingleAprrovedTweet, getApprovedTweets, getLastModel, updateUserStats } from "../../helpers/firestore";
import { toast } from "react-toastify";

const RetrainingModel = () => {

    const [allReportsValue] = useCollection(getApprovedTweets(), { snapshotListenOptions: { includeMetadataChanges: true } });

    const [approvedReports, setApprovedReports] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let newApprovedReports = [];

        allReportsValue && allReportsValue.docs.forEach(doc => {
            newApprovedReports.push(doc.data());
        });

        setApprovedReports(newApprovedReports);
    }, [allReportsValue]);

    const handleReject = (index, data, setData) => {
        try {
            const newData = [...data];
            let rejectedTweet = newData.splice(index, 1);
            setData(newData);
            console.log(rejectedTweet);
            deleteSingleAprrovedTweet(rejectedTweet[0].tweetId);
            toast.success('Tweet Rejected Successfully');
        } catch (error) {
            toast.error('Error while rejecting tweet');
            console.log(error);
        }
    }

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) {
            newWindow.opener = null;
        }
    }

    const onRetrainClick = async () => {
        setIsLoading(true);
        try {
            // check if already a model is being trained
            const lastModel = await getLastModel();
            if(lastModel.status.toLowerCase() !== "trained") {
                toast.error('Model is already being trained');
                return;
            }

            // update stats
            let userTweetMap = {};
            approvedReports.forEach((tweet) => {
                tweet.reportedBy.forEach((userId) => {
                    if (!userTweetMap[userId]) {
                        userTweetMap[userId] = [];
                    }
                    userTweetMap[userId].push(tweet);
                });
            });
            Object.keys(userTweetMap).forEach((userId) => {
                const userTweetsCount = userTweetMap[userId].length;
                console.log(`${userId} has ${userTweetsCount} tweets`);
                updateUserStatsHandler(userId, userTweetsCount);
            });

            // clear approved tweets collection
            const approvedTweetIds = approvedReports.map(approvedTweet => approvedTweet.tweetId);
            batchDeleteApprovedTweets(approvedTweetIds);

            let retrainingData = approvedReports.map(approvedTweet => {
                return {
                    "text": approvedTweet.tweetText,
                    "label": approvedTweet.correctLabel === "bully" ? 1 : 0
                };
            });
            console.log(retrainingData);

            // check if atleast 1 elements label is 1
            if (retrainingData.filter(tweet => tweet.label === 1).length === 0) {
                toast.error('No tweets with bully label found');
                return;
            }
            // check if atleast 1 elements label is 0
            if (retrainingData.filter(tweet => tweet.label === 0).length === 0) {
                toast.error('No tweets with non-bully label found');
                return;
            }
            // send data to retraining model
            const response = await fetch(`${CONSTANTS.API_URL}/retrain`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'data': retrainingData })
            });
            const data = await response.json();
            console.log(data);
            toast.success(`${data.message} for version ${data.model_version}`);
        } catch (error) {
            toast.error('Some error occured !!');
            console.log(error);
        }
        setIsLoading(false);
    }

    const updateUserStatsHandler = async (userId, approvedCount) => {
        await updateUserStats(userId, 0, 0, 0, approvedCount);
    }

    const getTable = (data, setData) => {
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
                    <tbody style={{ textAlign: 'center' }}>
                        {
                            data.map((item, index) => {
                                return (
                                    <tr key={item.tweetId} className="unread">
                                        <td><h6 className="mb-1">{index + 1}</h6></td>
                                        <td onClick={() => openInNewTab(item.tweetUrl)} style={{ cursor: 'pointer' }} ><h6 className="mb-1">{item.tweetText}</h6></td>
                                        <td><h6 className="mb-1">{item.correctLabel}</h6></td>
                                        <td><h6 className="mb-1">{item.reportCount}</h6></td>
                                        <td>
                                            <a
                                                onClick={() => handleReject(index, data, setData)}
                                                href={CONSTANTS.BLANK_LINK}
                                                className="label theme-bg3 text-white f-12"
                                            >
                                                Reject
                                            </a>
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
                <Col
                    className='m-b-30'
                    style={{
                        height: '525px',
                        overflowY: 'scroll',
                        // background: '#fff', 
                        // padding: '20px', 
                        // borderRadius: '10px', 
                        // boxShadow: '-5px 0px 5px #ccc' 
                    }}
                >
                    <Card>
                        <Card.Header style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Card.Title as="h5">
                                Approved Tweets For Retraining ({approvedReports.length})
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            {getTable(approvedReports, setApprovedReports)}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <div style={{ display: 'flex', flexDirection: 'row-reverse' }} >
                <Button variant="primary" onClick={onRetrainClick} >
                    {
                        isLoading
                            ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                                <ReactLoading type="spinningBubbles" color="#fff" height={20} width={20} />
                            </div>
                            : "Retrain Model"
                    }
                </Button>
            </div>
        </Aux>
    );
}

export default RetrainingModel;