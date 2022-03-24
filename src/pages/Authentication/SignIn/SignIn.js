import React, { useState } from 'react';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';

import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import { useUserAuth } from '../../../contexts/AuthContext';
import { useHistory, NavLink } from 'react-router-dom';


const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useUserAuth();
    const history = useHistory();

    const handleLoginClick = async () => {
        console.log('Login Clicked');
        setIsLoading(true);
        try {
            let user = await login(email, password);
            localStorage.setItem('user', JSON.stringify(user.user));
            setIsLoading(false);
            toast.success('Login Successful');
            history.push('/dashboard');
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message);
        }
    }


    return (
        <Aux>
            <Breadcrumb />
            <div className="auth-wrapper">
                <div className="auth-content">
                    <div className="auth-bg">
                        <span className="r" />
                        <span className="r s" />
                        <span className="r s" />
                        <span className="r" />
                    </div>
                    <div className="card">
                        <div className="card-body text-center">
                            <div className="mb-4">
                                <i className="feather icon-unlock auth-icon" />
                            </div>
                            <h3 className="mb-4">Login</h3>
                            <div className="input-group mb-3">
                                <input type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="input-group mb-4">
                                <input type="password" className="form-control" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            {/* <div className="form-group text-left">
                                <div className="checkbox checkbox-fill d-inline">
                                    <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" />
                                    <label htmlFor="checkbox-fill-a1" className="cr"> Save credentials</label>
                                </div>
                            </div> */}
                            <button 
                                onClick={handleLoginClick}
                                className="btn btn-primary shadow-2 mb-4"
                            >
                                {
                                    isLoading 
                                    ? <ReactLoading type='spinningBubbles' height={26} width={26} /> 
                                    : 'Login'
                                }
                            </button>
                            <p className="mb-2 text-muted">Forgot password? <NavLink to="/auth/reset-password-1">Reset</NavLink></p>
                            <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/signup-1">Signup</NavLink></p>
                        </div>
                    </div>
                </div>
            </div>
        </Aux>
    );
}

export default SignIn;