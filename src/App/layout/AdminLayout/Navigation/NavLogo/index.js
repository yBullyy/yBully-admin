import React from 'react';
import Aux from "../../../../../hoc/_Aux";
import ybullyLogo from '../../../../../assets/images/ybully-logo.jpg';

const navLogo = (props) => {
    return (
        <Aux>
            <div className="navbar-brand header-logo">
                <a href='/' className="b-brand">
                    <div className="b-bg">
                        <img src={ybullyLogo} className="img-fluid" alt="YBULLY" style={{ borderRadius: '10px' }} />
                    </div>
                    <span className="b-title">yBully Admin</span>
                </a>
            </div>
        </Aux>
    );
};

export default navLogo;
