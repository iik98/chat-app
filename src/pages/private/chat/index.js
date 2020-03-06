import React from 'react';

import { Route, Switch } from 'react-router-dom';

import List from './list';
import Room from './room';

function Chat() {

    return <Switch>
        <Route path="/chat/:chatId" component={Room} />
        <Route component={List} />
    </Switch>
}

export default Chat;