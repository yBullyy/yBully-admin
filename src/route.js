import React from 'react';

const Signin = React.lazy(() => import('./pages/Authentication/SignIn/SignIn'));

const route = [
    { path: '/auth/signin', exact: true, name: 'Signin', component: Signin }
];

export default route;