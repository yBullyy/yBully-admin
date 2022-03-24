import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../helpers/auth';

const PrivateRoute = ({ component: Component, ...rest}) => {
    return (
        <Route 
            {...rest} 
            render={ props => 
                !isAuthenticated() ? 
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