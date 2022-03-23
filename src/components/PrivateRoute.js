import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUserAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ component: Component, ...rest}) => {
    const { user } = useUserAuth();

    return (
        <Route 
            {...rest} 
            render={ props => 
                !user ? 
                <Redirect 
                    to={{
                        pathname: "/auth/signin",
                        state: {from: props.location}
                    }}
                />
                : <Component {...props} />
            }
        />
    );
}

export default PrivateRoute;