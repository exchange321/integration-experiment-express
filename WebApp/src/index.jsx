/* Created by Wayuki on 07-Jan-17 0007. */
import React from 'react';
import DDPClient from 'ddp-client';

import {Provider} from 'react-redux';
import configureStore from './store/configureStore';

import AppRouter from './AppRouter.jsx';

const store = configureStore();

const ddpclient = new DDPClient({
    host: 'localhost',
    port: 3010,
    ssl: false,
    autoReconnect: true,
    autoReconnectTimer: 500,
    maintainCollections : true,
    ddpVersion : '1',
});

ddpclient.connect((err, wasReconnect) => {
    if (err) {
        console.log('DDP Connection Error!');
        return false;
    }
    console.log('DDP Connected!');

    ddpclient.subscribe('topics', [], () => {
        console.log('Topics Subscribed!');
        console.log(ddpclient.collections.topics);
    });
});

const AppContainer = () => (
    <Provider store = {store} >
        <AppRouter store = {store} />
    </Provider>
);

export default AppContainer;
