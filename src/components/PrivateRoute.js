import React from 'react';

import { Route, Redirect } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';
import { useFirebase } from './FirebaseProvider';

import DataProvider from './DataProvider';

function PrivateRoute({ component: Component, ...restProps }) {

    const { user } = useFirebase();
    return <Route
        {...restProps}

        render={props => {

            return user ?
                <DataProvider><Component {...props} /></DataProvider>
                :
                <Redirect to={{
                    pathname: '/login',
                    state: {
                        from: props.location
                    }
                }} />
        }}

    />
}

export default PrivateRoute;