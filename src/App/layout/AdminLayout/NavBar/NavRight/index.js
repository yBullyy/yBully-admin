import React, { useEffect, useState } from 'react';
import {Dropdown} from 'react-bootstrap';
import { toast } from 'react-toastify';

import Aux from "../../../../../hoc/_Aux";
import CONSTANTS from "../../../../../store/constant";

import Avatar1 from '../../../../../assets/images/user/avatar-1.jpg';
// import Avatar2 from '../../../../../assets/images/user/avatar-2.jpg';
// import Avatar3 from '../../../../../assets/images/user/avatar-3.jpg';
import { useHistory } from 'react-router-dom';
import { useUserAuth } from '../../../../../contexts/AuthContext';
import { getUser } from '../../../../../helpers/auth';

const NavRight = (props) => {
    const { logout } = useUserAuth();
    const history = useHistory();
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const getCurrUser = async () => {
            let user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                let userDoc = await getUser(user.uid);
                if (userDoc.exists()) {
                    setUser(userDoc.data());
                }
            }
        }
        getCurrUser();
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem('user');
            toast.success('Logout Successful');
            history.push('/auth/login');
        } catch (error) {
            console.log(error.message);
        }
    }


        return (
            <Aux>
                <ul className="navbar-nav ml-auto">
                    {/* <li>
                        <Dropdown alignRight={!props.rtlLayout}>
                            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                                <i className="icon feather icon-bell"/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu alignRight className="notification">
                                <div className="noti-head">
                                    <h6 className="d-inline-block m-b-0">Notifications</h6>
                                    <div className="float-right">
                                        <a href={CONSTANTS.BLANK_LINK} className="m-r-10">mark as read</a>
                                        <a href={CONSTANTS.BLANK_LINK}>clear all</a>
                                    </div>
                                </div>
                                <ul className="noti-body">
                                    <li className="n-title">
                                        <p className="m-b-0">NEW</p>
                                    </li>
                                    <li className="notification">
                                        <div className="media">
                                            <img className="img-radius" src={Avatar1} alt="Generic placeholder"/>
                                            <div className="media-body">
                                                <p><strong>John Doe</strong><span className="n-time text-muted"><i
                                                    className="icon feather icon-clock m-r-10"/>30 min</span></p>
                                                <p>New ticket Added</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="n-title">
                                        <p className="m-b-0">EARLIER</p>
                                    </li>
                                    <li className="notification">
                                        <div className="media">
                                            <img className="img-radius" src={Avatar2} alt="Generic placeholder"/>
                                            <div className="media-body">
                                                <p><strong>Joseph William</strong><span className="n-time text-muted"><i
                                                    className="icon feather icon-clock m-r-10"/>30 min</span></p>
                                                <p>Prchace New Theme and make payment</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="notification">
                                        <div className="media">
                                            <img className="img-radius" src={Avatar3} alt="Generic placeholder"/>
                                            <div className="media-body">
                                                <p><strong>Sara Soudein</strong><span className="n-time text-muted"><i
                                                    className="icon feather icon-clock m-r-10"/>30 min</span></p>
                                                <p>currently login</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <div className="noti-footer">
                                    <a href={CONSTANTS.BLANK_LINK}>show all</a>
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li> */}
                    <li>
                        <Dropdown alignRight={!props.rtlLayout} className="drp-user">
                            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                                <i className="icon feather icon-settings"/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu alignRight className="profile-notification">
                                <div className="pro-head">
                                    <img src={Avatar1} className="img-radius" alt="User Profile"/>
                                    <span>{ user && user.name }</span>
                                    <div onClick={handleLogout} className="dud-logout" title="Logout">
                                        <i className="feather icon-log-out"/>
                                    </div>
                                </div>
                                <ul className="pro-body">
                                    <li><a href={CONSTANTS.BLANK_LINK} className="dropdown-item"><i className="feather icon-user"/> Profile</a></li>
                                    <li onClick={handleLogout} ><a href={CONSTANTS.BLANK_LINK} className="dropdown-item"><i className="feather icon-log-out"/> Logout</a></li>
                                </ul>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>
            </Aux>
        );
}

export default NavRight;
