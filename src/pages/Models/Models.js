import React, { useEffect, useState } from "react";
import { Card, Button } from 'react-bootstrap';
import { useCollection } from "react-firebase-hooks/firestore";
import { toast } from "react-toastify";
import ReactLoading from 'react-loading';

import { getModelDownloadUrl, getModels } from "../../helpers/firestore";
import Aux from "../../hoc/_Aux";
import CONSTANTS from "../../store/constant";

const Models = () => {

    const [allModelsValue] = useCollection(getModels(), { snapshotListenOptions: { includeMetadataChanges: true } });
    const [models, setModels] = useState([]);
    const [activateModelLoadingIds, setActivateModelLoadingIds] = useState({});

    useEffect(() => {
        let newModels = [];

        allModelsValue && allModelsValue.docs.forEach(doc => {
            newModels.push(doc.data());
        });
        setModels(newModels);
    }, [allModelsValue]);

    const downloadModelHandler = (model_location) => {
        getModelDownloadUrl(model_location)
        .then(url => {
            openInNewTab(url);
        });
    }

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) {
            newWindow.opener = null;
        }
    }

    const activateModelHandler = async (e, model_version, model_location) => {
        const { id } = e.target;
        setActivateModelLoadingIds(ids => ({
            ...ids,
            [id]: true
        }));
        try {
            const response = await fetch(`${CONSTANTS.WEBSOCKET_URL}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    download_url: model_location,
                    model_version: model_version
                })    
            });
            const data = await response.json();
            toast.success(data.message);
            console.log(data);
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
        setActivateModelLoadingIds(ids => ({
            ...ids,
            [id]: false
        }));
    }

    return (
        <Aux>
            {
                models.map((model, index) => {
                    let activeIndicatorColor = model.isActive ? "green" : "red";
                    let statusIndicatorColor = model.status.toLowerCase() === "trained" ? "green" : "yellow";
                    let boxShadow = model.isActive ? "0 1px 5px 0 rgb(84 231 118)" : "0 1px 20px 0 rgb(69 90 100 / 8%)"
                    let blinkClassName = model.status.toLowerCase() === "trained" ? "" : "blink";

                    return (
                        <Card key={index} style={{ boxShadow: boxShadow }} >
                            <Card.Body>
                                <div>
                                    <div className="m-b-10" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} >
                                        <h5 style={{ color: "#888", fontWeight: "bold" }} >{model.name != null ? model.name.split('_').join(' ') : '-'}</h5>
                                        <div><i className={`fa fa-circle text-c-${activeIndicatorColor} f-10 m-l-5`} /> {model.isActive ? 'Active' : 'Inactive'}</div>
                                    </div>
                                    
                                    <div className="m-b-5" >
                                        <b>Loss: </b>
                                        <i>{model.history != null ? model.history.loss[model.history.loss.length - 1].toFixed(5) : '-'}</i>
                                        <br />
                                    </div>
                                    
                                    <div className="m-b-5" >
                                        <b>Val Loss: </b>
                                        <i>{model.history != null ? model.history.val_loss[model.history.val_loss.length - 1].toFixed(5) : '-'}</i>
                                        <br />
                                    </div>

                                    <div className="m-b-5" >
                                        <b>Trained on: </b>
                                        <i>{model.date != null ? new Date(model.date.seconds * 1000).toUTCString() : '-'}</i>
                                        <br />
                                    </div>

                                    <div className="m-b-5" >
                                        <b>Version: </b>
                                        <i>{model.version}</i> 
                                        <br />
                                    </div>

                                    <div
                                    >
                                        <b>Status: </b>
                                        <i className={`fa fa-circle text-c-${statusIndicatorColor} f-10 m-l-5 m-r-5 ${blinkClassName}`} />
                                        <i className={blinkClassName} >{model.status}</i>
                                    </div>

                                    {
                                        !model.isActive && model.status.toLowerCase() === "trained" &&
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                                                <div></div>
                                                <div>
                                                    <Button variant="primary" size="sm" className="m-l-10" id={index} onClick={(e) => activateModelHandler(e, model.version, model.location)} >
                                                        {
                                                            activateModelLoadingIds[index]
                                                            ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                                                                <ReactLoading type="spinningBubbles" color="#fff" height={20} width={20} />
                                                            </div>
                                                            : "Activate"
                                                        }
                                                    </Button>
                                                    
                                                    <Button variant="outline-dark" size="sm" className="m-l-10" onClick={() => downloadModelHandler(model.location)} >
                                                        Download <i className="fa fa-download" />
                                                    </Button>
                                                </div>
                                            </div>
                                    }
                                </div>
                            </Card.Body>
                        </Card>
                    )
                })
            }
        </Aux>
    );
}

export default Models;