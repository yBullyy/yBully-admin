import React from "react";
import { Col, Card } from 'react-bootstrap';
import CountUp from 'react-countup';


const StatsContainer = ({ title, count, progress, progressBarTheme = "progress-c-theme" }) => {
    return (
        <Col md={6} xl={3}>
            <Card>
                <Card.Body>
                    <h6 className='mb-4'>{title}</h6>
                    <div className="row d-flex align-items-center">
                        <div className="col-9">
                            <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                {/* <i className="feather icon-arrow-up text-c-green f-30 m-r-5"/>  */}
                                <CountUp start={0} end={count} duration={2} separator="," />
                                {/* { stats.total_predictions } */}
                            </h3>
                        </div>

                        <div className="col-3 text-right">
                            <p className="m-b-0">{progress}%</p>
                        </div>
                    </div>
                    <div className="progress m-t-30" style={{ height: '7px' }}>
                        <div className={`progress-bar ${progressBarTheme}`} role="progressbar" style={{ width: `${progress}%` }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" />
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default StatsContainer;