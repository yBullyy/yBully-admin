import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'));
const Admins = React.lazy(() => import('./pages/Admins/Admins'));
const Users = React.lazy(() => import('./pages/Users/Users'));
const Models = React.lazy(() => import('./pages/Models/Models'));
const ReportedTweets = React.lazy(() => import('./pages/TweetReports/ReportedTweets'));
const RetrainingModel = React.lazy(() => import('./pages/TweetReports/RetrainingModel'));

const routes = [
    { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard, isPrivate: true },
    { path: '/admins', exact: true, name: 'Admins', component: Admins, isPrivate: true },
    { path: '/users', exact: true, name: 'Users', component: Users, isPrivate: true },
    { path: '/models', exact: true, name: 'Models', component: Models, isPrivate: true },
    { path: '/reported-tweets', exact: true, name: 'Reported Tweets', component: ReportedTweets, isPrivate: true },
    { path: '/retraining-model', exact: true, name: 'Retraining Model', component: RetrainingModel, isPrivate: true },
];

export default routes;